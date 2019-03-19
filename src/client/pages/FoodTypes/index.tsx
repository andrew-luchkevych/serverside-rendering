import * as React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import PaperWrapper from "../../components/Layout/PaperWrapper";
import Padder from "../../components/Layout/Padder/index";
import routines from "../../../shared/redux/foodType/routines";
export interface FoodTypePageProps {
	dispatch: Function;
}

export class FoodTypePage extends React.PureComponent<FoodTypePageProps> {
	onClick = () => {
		this.props.dispatch(routines.get.trigger());
	}
	render() {
		return (
			<PaperWrapper>
				<Helmet>
					<title>Food Types</title>
				</Helmet>
				<Padder>
					<button onClick={this.onClick}>Dispatch get</button>
				</Padder>
			</PaperWrapper>
		);
	}
}

export default connect(null)(FoodTypePage);
