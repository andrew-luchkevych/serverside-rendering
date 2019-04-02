import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";

const styles = (theme: Theme) => ({
	paper: <CSSProperties>{
		width: "100%",
		display: "flex",
		flexDirection: "row",
		overflow: "hidden",
		[theme.breakpoints.up(960)]: <CSSProperties>{
			maxHeight: "calc(100vh - 110px)",
		},
		[theme.breakpoints.down(960)]: <CSSProperties>{
			maxHeight: "auto",
			height: "auto",
		},
	},
	col: <CSSProperties>{
		overflow: "hidden",
		[theme.breakpoints.up(960)]: <CSSProperties>{
			height: "100%",
		},
		[theme.breakpoints.down(960)]: <CSSProperties>{
			height: "auto",
			maxHeight: "100vh",
		},
	},
});

export default styles;