import { Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export const sharedItemStyles = {
	item: <CSSProperties>{
		paddingTop: 4,
		paddingBottom: 4,
		color: "rgba(255, 255, 255, 0.7)",
	},
	itemCategory: <CSSProperties>{
		backgroundColor: "#232f3e",
		boxShadow: "0 -1px 0 #404854 inset",
		paddingTop: 16,
		paddingBottom: 16,
	},
};

export const itemStyles = (theme: Theme) => ({
	...sharedItemStyles,
	itemPrimary: {
		color: "inherit",
		fontSize: theme.typography.fontSize,
		"&$textDense": {
			fontSize: theme.typography.fontSize,
		},
	},
	textDense: {},
});

export const titleStyles = (theme: Theme) => ({
	...sharedItemStyles,
	firebase: {
		fontSize: 24,
		fontFamily: theme.typography.fontFamily,
		color: theme.palette.common.white,
	},
});