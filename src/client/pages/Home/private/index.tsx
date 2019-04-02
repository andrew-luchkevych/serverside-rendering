import * as React from "react";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Order from "./Order";
import Chat from "./Chat/index";
import styles from "./styles";
import { combineStyles } from "../../../utils/styles";
import { layout } from "../../../theme/index";
export interface PrivateHomeProps {
	classes: {
		paper: string;
		container: string;
		flexOne: string;
		fullHeightHiddenOverflow: string;
		col: string;
	};
}
export const PrivateHome = (props: PrivateHomeProps) => (
	<div>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<Paper className={props.classes.paper}>
			<Grid container spacing={24} className={props.classes.flexOne}>
				<Grid item md={6} sm={12} xs={12} className={props.classes.col}>
					<Order />
				</Grid>
				<Grid item md={6} sm={12} xs={12} className={props.classes.col}>
					<Chat />
				</Grid>
			</Grid>
		</Paper>
	</div>
);

export default withStyles(combineStyles(layout, styles))(PrivateHome);