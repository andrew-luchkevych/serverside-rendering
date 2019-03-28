import dotenv from "dotenv";
import mongoose from "mongoose";
import bluebird from "bluebird";
import init from "./app";
dotenv.config({
	path: ".env.server." + (process.env.NODE_ENV === "production" ? "production" : "development"),
});
const MONGODB_URI = process.env.MONGODB_URI || "";

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
console.log({ mongoUrl });
(<any>mongoose).Promise = bluebird;
const mongooseConnectOptions = {
	useMongoClient: true,
};
mongoose.set("debug", true);
mongoose.connect(mongoUrl, mongooseConnectOptions);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "db connection error:"));
db.on("open", function () {
	console.log("DB connection established");
	init();
});
