import * as React from "react";
import { Helmet } from "react-helmet";
import PaperWrapper from "../../components/Layout/PaperWrapper";
import Padder from "../../components/Layout/Padder/index";

export const Home = () => (
	<PaperWrapper>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<Padder>
			Hello
				</Padder>
	</PaperWrapper>
);