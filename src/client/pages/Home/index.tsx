import * as React from "react";
import { connect } from "react-redux";
import { loggedSelector } from "../../../shared/redux/user/selectors";
import PrivateHome from "./private";
import PublicHome from "./public";
export interface HomeProps {
	logged: boolean;
}
export const Home = (props: HomeProps) => {
	return props.logged
		? <PrivateHome />
		: <PublicHome />;
};

export default connect<HomeProps>(loggedSelector)(Home);