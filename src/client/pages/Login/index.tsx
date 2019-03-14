import * as React from "react";
import { Helmet } from "react-helmet";
import PaperWrapper from "../../components/Layout/PaperWrapper";
import Padder from "../../components/Layout/Padder/index";
import LoginForm from "./form";

export default class Login extends React.PureComponent {
	onSubmit = () => {
		return new Promise<boolean>((resolve, reject) => {
			window.setTimeout(() => {
				resolve(true);
			}, 3000);
		});
	}
	render() {
		return (
			<PaperWrapper>
				<Helmet>
					<title>Login</title>
				</Helmet>
				<Padder>
					<LoginForm onSubmit={this.onSubmit} />
				</Padder>
			</PaperWrapper>
		);
	}
}