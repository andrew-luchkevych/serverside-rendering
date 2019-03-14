import * as React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import PaperWrapper from "../../components/Layout/PaperWrapper";
import Padder from "../../components/Layout/Padder/index";
import { userState } from "../../../shared/redux/user/selectors";
import { UserState } from "../../../shared/redux/user";
import routines from "../../../shared/redux/user/routines";
import WithDispatch from "../../../shared/types/store/dispatch";
export interface HomeProps extends WithDispatch {
	store: any;
}

export class Home extends React.PureComponent<HomeProps> {
	render() {
		return (
			<PaperWrapper>
				<Helmet>
					<title>Home</title>
				</Helmet>
				<Padder>
					Hello
				</Padder>
			</PaperWrapper>
		);
	}
}
const mapStateToProps = (state) => {
	console.log({ state });
	return {
		store: state,
	};
}
export default connect(mapStateToProps)(Home);