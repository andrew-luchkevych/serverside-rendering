import * as React from "react";
import { Helmet } from "react-helmet";
import PaperWrapper from "../../components/Layout/PaperWrapper";
import Padder from "../../components/Layout/Padder/index";
export interface HomeProps {

}

export default class Home extends React.PureComponent<HomeProps> {
	render() {
		return (
			<PaperWrapper>
				<Helmet>
					<title>Home</title>
				</Helmet>
				<Padder>
					Hello world
				</Padder>
			</PaperWrapper>
		);
	}
}