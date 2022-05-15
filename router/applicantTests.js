const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const controller = require("../controller/applicantTests");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ApplicantTest:
 *       type: object
 *       required:
 *         - email
 *         - testId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         email:
 *           type: string
 *           description: Applicant email
 *         testId:
 *           type: string
 *           description: Applicant test id
 *         StartDate:
 *           type: Date
 *           description: Datetime of test creation
 *       example:
 *         id: d5fE_asz
 *         email: bob@email.com
 *         testId: test102
 */

/**
 * @swagger
 * tags:
 *   name: ApplicantTests
 *   description: The ApplicantTest managing API
 */

/**
 * @swagger
 * /api/applicantTests:
 *   post:
 *     summary: Test registering
 *     tags: [ApplicantTests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 description: Applicant email
 *               testId:
 *                 type: string
 *                 description: Applicant test id
 *     responses:
 *       200:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicantTest'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some server error
 */

router.post(
	"/",
	body("email").notEmpty().isEmail().isLength({ max: 100 }),
	body("testId").notEmpty(),
	controller.postApplicantTest
);

/**
 * @swagger
 * /api/applicantTests/{applicantTestId}:
 *   post:
 *     summary: Test Submitting
 *     tags: [ApplicantTests]
 *     parameters:
 *       - in: path
 *         name: applicantTestId
 *         schema:
 *           type: string
 *         required: true
 *         description: applicantTest.id
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               gitRepo:
 *                 type: string
 *               file:
 *                 type: file
 *                 format: file
 *                 x-mimetype: application/zip
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApplicantTest'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Some server error
 */

router.post(
	"/:applicantTestId",
	upload.single("file"),
	controller.postApplicantTestResult
);

module.exports = router;
