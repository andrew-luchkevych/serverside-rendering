import * as React from "react";
import { Helmet } from "react-helmet";
import PaperWrapper from "../../components/Layout/PaperWrapper";
import Padder from "../../components/Layout/Padder/index";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Home = () => (
	<PaperWrapper>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<Padder>
			<Typography>
				Upsss.. Its looks like you are not signed in. To continue, please {" "}
				<Link to="/signin">Sign In</Link>.
			</Typography>
			<Typography>
				Or, if you have not account, just {" "}
				<Link to="/signup">Sign Up</Link>.
			</Typography>
		</Padder>
	</PaperWrapper>
);

export default Home;