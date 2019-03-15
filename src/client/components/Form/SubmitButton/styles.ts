import { Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export const styles = (theme: Theme) => ({
	submit: <CSSProperties>{
		marginTop: theme.spacing.unit * 3,
	},
	label: <CSSProperties>{
		textTransform: "uppercase",
	},
});