import * as React from "react";
import { Helmet } from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Padder from "../../../components/Layout/Padder";
import Order from "./Order";
import Chat from "./Chat/index";
import styles from "./styles";
export interface PrivateHomeProps {
	classes: {
		paper: string;
		container: string;
	};
}
export const PrivateHome = (props: PrivateHomeProps) => (
	<div>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<Paper className={props.classes.paper}>
			<Grid container spacing={24}>
				<Grid item md={6} sm={12} xs={12}>
					<Order />
				</Grid>
				<Grid item md={6} sm={12} xs={12}>
					<Chat />
				</Grid>
			</Grid>
		</Paper>
	</div>
);

export default withStyles(styles)(PrivateHome);