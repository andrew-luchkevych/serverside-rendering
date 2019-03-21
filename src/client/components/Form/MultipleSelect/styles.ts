import { Theme } from "@material-ui/core";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
export const styles = (theme: Theme) => ({
	chips: <CSSProperties>{
		display: "flex",
		flexWrap: "wrap",
	},
	chip: <CSSProperties>{
		margin: theme.spacing.unit / 4,
	},
});