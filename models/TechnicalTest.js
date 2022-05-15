const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const Model = new Schema({
	Id: { type: String, required: true, index: { unique: true } },
	CreatedAt: { type: Date, index: true },
	UpdatedAt: { type: Date },
});

Model.pre("save", function (next) {
	if (!this.CreatedAt) {
		this.CreatedAt = new Date();
	}

	next();
});

Model.pre("update", function () {
	this.update({}, { $set: { UpdatedAt: new Date() } });
});

const TechnicalTest = mongoose.model("technicalTest", Model, "technicalTests");

module.exports = TechnicalTest;
