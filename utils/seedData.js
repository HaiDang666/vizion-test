const TechnicalTest = require("../models/TechnicalTest");

(async () => {
	const tests = await TechnicalTest.findOne({ id: { $exists: true } });

	if (!tests) {
		TechnicalTest.create(
			{
				Id: "test-1",
			},
			(err, result) => {
				console.log("seeded data");
			}
		);
	}
})();
