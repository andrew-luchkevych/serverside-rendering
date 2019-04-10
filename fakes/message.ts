import MessageProps from "../src/shared/types/Message";
import fakeUser from "./user";

export const fakeMessage: MessageProps = {
	_id: "fake",
	author: fakeUser,
	text: "message",
	createdAt: (new Date()).toISOString(),
	updatedAt: (new Date()).toISOString(),
}

export default fakeMessage;