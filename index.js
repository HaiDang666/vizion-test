const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const AppConfig = require("./config");
const apiRouter = require("./router/api");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Applicant Test API",
			version: "1.0.0",
			description: "A simple Express API",
		},
		servers: [
			{
				url: "http://localhost:4000",
			},
		],
	},
	apis: ["./router/*.js"],
};

mongoose.connect(
	AppConfig.db.uri,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err) => {
		if (err) {
			console.log(err);
			console.log(
				"MongoDB Connection Error. Please make sure that MongoDB is running."
			);
		} else {
			require("./utils/seedData");
			console.log("Connected to MongoDB");
		}
	}
);

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", apiRouter);

app.listen(AppConfig.port, () =>
	console.log(`The server is running on port ${AppConfig.port}`)
);
