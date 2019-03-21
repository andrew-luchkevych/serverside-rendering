import * as React from "react";
import { Helmet } from "react-helmet";
import { withRouter, RouteComponentProps } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PaperWrapper from "../../../components/Layout/PaperWrapper";
import Padder from "../../../components/Layout/Padder/index";
import FoodProvidersContainer from "./container";
import { page as styles } from "./styles";
export interface FoodProvidersPageProps extends RouteComponentProps {
	classes: {
		fab: string;
	};
}
export const FoodProvidersPage = (props: FoodProvidersPageProps) => (
	<PaperWrapper>
		<Helmet>
			<title>Food Providers</title>
		</Helmet>
		<Padder>
			<Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
				Food Providers
				<Fab color="primary" aria-label="Add" className={props.classes.fab} onClick={() => props.history.push("/food-providers/create")}>
					<AddIcon />
				</Fab>
			</Typography>
			<FoodProvidersContainer />
		</Padder>
	</PaperWrapper>
);

export default withRouter(withStyles(styles)(FoodProvidersPage));
