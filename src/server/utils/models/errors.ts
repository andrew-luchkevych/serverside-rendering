import { Document, NativeError } from "mongoose";
interface WithErrors extends Error {
	errors?: Array<string>;
}
const transformMongooseErrors = (uniqueMessage: string) => (error: any, doc: Document, next: (err?: NativeError) => void) => {
	if (error.name === "MongoError" && error.code === 11000) {
		return next(new Error(uniqueMessage));
	}
	if (error.name === "ValidationError") {
		const errors = [];
		Object.keys(error.errors).forEach(key => {
			errors.push(error.errors[key].message);
		});
		if (errors.length) {
			let e: WithErrors = new Error(errors[0]);
			e.errors = errors;
			return next(e);
		}
	}
	return next(error);
};

export default transformMongooseErrors;