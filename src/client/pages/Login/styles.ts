import { Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
export const styles = (theme: Theme) => ({
	main: <CSSProperties>{
		width: "auto",
		display: "block",
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto",
		},
	},
	paper: <CSSProperties>{
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: <CSSProperties>{
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
});