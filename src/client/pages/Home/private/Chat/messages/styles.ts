import { CSSProperties } from "@material-ui/core/styles/withStyles";

export const styles = {
	messagesListWrapper: <CSSProperties><any>{
		display: "flex",
		flexDirection: "column-reverse",
		overflowY: "overlay",
	},
	list: <CSSProperties>{
		display: "flex",
		flexDirection: "column-reverse",
	},
};

export const messageStyles = {
	message: <CSSProperties>{
		display: "flex",
		flexDirection: "row",
		minHeight: 50,
		alignItems: "center",
		marginRight: 20,
	},
	messageContainer: <CSSProperties>{
		padding: 10,
	},
	currentUserMessage: <CSSProperties>{
		flexDirection: "row-reverse",
	},
	currentUserMessageContainer: <CSSProperties>{
		textAlign: "right",
	},
};