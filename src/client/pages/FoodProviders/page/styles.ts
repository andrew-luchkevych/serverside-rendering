import { Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";

export const page = (theme: Theme) => ({
	fab: <CSSProperties>{
		margin: theme.spacing.unit,
	},
});