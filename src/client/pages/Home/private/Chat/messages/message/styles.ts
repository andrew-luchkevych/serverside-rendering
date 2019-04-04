import { CSSProperties } from "@material-ui/core/styles/withStyles";

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
	fabContainer: <CSSProperties>{
		display: "flex",
		flexDirection: "row-reverse",
	},
};