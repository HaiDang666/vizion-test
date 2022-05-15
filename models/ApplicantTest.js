const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Model = new Schema({
	Id: { type: mongoose.SchemaTypes.ObjectId, index: true },
	Email: { type: String, required: true, max: 100 },
	TestId: { type: String, required: true, index: true },
	GitRepo: { type: String, default: null },
	FileUrl: { type: String, default: null },
	StartDate: { type: Date, index: true },
	SubmitDate: { type: Date, index: true, default: null },
	Note: { type: String, default: null },
	UpdatedAt: { type: Date },
});

Model.pre("save", function (next) {
	if (!this.StartDate) {
		this.StartDate = new Date();
	}
	if (!this.Id) {
		this.Id = this._id;
	}
	next();
});

Model.pre("update", function () {
	this.update({}, { $set: { UpdatedAt: new Date() } });
});

const ApplicantTest = mongoose.model("applicantTest", Model, "applicantTests");

module.exports = ApplicantTest;
