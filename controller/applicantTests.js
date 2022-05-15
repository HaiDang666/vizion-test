const { validationResult } = require("express-validator");
const { ApplicantTest, TechnicalTest } = require("../models");
const deleteFile = require("../utils/deleteFile");
const uploadToAzure = require("../utils/uploadToAzure");

const makeResponse = (message = "SUCCESS", data = {}, errors = []) => {
	return { message, data, errors };
};

const controller = {
	postApplicantTest: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res
				.status(400)
				.json(makeResponse("INVALID_INPUT", {}, errors.array()));
		}

		const { email, testId } = req.body;

		const technicalTest = await TechnicalTest.findOne({ id: testId });
		if (!technicalTest) {
			return res.status(404).json(makeResponse("INVALID_TEST"));
		}

		const newApplicant = await ApplicantTest.create({
			Email: email,
			TestId: testId,
		});

		res.status(200).json(makeResponse("SUCCESS", newApplicant));
	},

  postApplicantTestResult: async (req, res) => {
    const { applicantTestId } = req.params;
    const applicantTest = await ApplicantTest.findOne({ Id: applicantTestId });
    if (!applicantTest) {
      return res.status(404).json(makeResponse("TEST_NOT_FOUND"));
    }

    if (applicantTest.SubmitDate) {
      return res.status(400).json(makeResponse("NO_RESUBMIT"));
    }

    const { file } = req;
    let fileUrl = "";
    if (file) {
      if (file.mimetype !== "application/zip" || file.size >= 10000000) {
        deleteFile(file.path);
        return res.status(400).json(makeResponse("INVALID_FILE"));
      }

      fileUrl = await uploadToAzure(file, applicantTest.id);
      deleteFile(file.path);
      if (!fileUrl) {
        return res.status(500).json(makeResponse("UPLOAD_FAILED"));
      }
    }

    const { gitRepo, note } = req.body;
    if (!gitRepo && !fileUrl) {
      return res.status(400).json(makeResponse("INVALID_INPUT"));
    }

    const updatedApplicantTest = await ApplicantTest.findOneAndUpdate({
      id: applicantTest.id,
    }, {
      ...(gitRepo && {GitRepo: gitRepo}),
      ...(note && {Note: note}),
      ...(fileUrl && {FileUrl: fileUrl}),
      SubmitDate: new Date(),
    }, {
      new: true
    })

    res.status(200).json(makeResponse("SUCCESS", updatedApplicantTest));
  }
};

module.exports = controller;
