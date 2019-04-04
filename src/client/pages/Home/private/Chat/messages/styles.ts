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