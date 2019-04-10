import * as React from "react";
import { connect } from "react-redux";
import { isUserLogged } from "../../../shared/redux/user/selectors";
import PrivateHome from "./private";
import PublicHome from "./public";
import { ReduxStoreState } from "../../../shared/types/store/RootReducer";
export interface HomeConnectedProps {
	logged: boolean;
}
export const Home = (props: HomeConnectedProps) => {
	return props.logged
		? <PrivateHome />
		: <PublicHome />;
};
export const mapStateToProps = (state: ReduxStoreState): HomeConnectedProps => ({ logged: isUserLogged(state) });
export default connect(mapStateToProps)(Home) as React.ComponentType;