import mongoose from "mongoose";
let counter = 0;
const maxReconnect = 20;
export async function createConnection(uri: string, options: mongoose.ConnectionOptions) {
	try {
		console.log("\ndb connection #", counter, "\n");
		await mongoose.connect(uri, options);
	} catch (_e) {
		console.log("\ndb error\n");
		counter++;
		if (counter < maxReconnect) {
			await createConnection(uri, options);
		}
	}
}

export default createConnection;