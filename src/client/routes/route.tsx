import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { AppRouteProps } from "../types/RouteProps";
import { isUserLogged } from "../../shared/redux/user/selectors";
import { ReduxStoreState } from "../../shared/types/store/RootReducer";

export interface WithAuthState {
	logged: boolean;
}
export const AppRoute = (props: AppRouteProps & WithAuthState) => {
	const { component: Component, isPrivate, logged, ...rest } = props;
	if (isPrivate) {
		return (
			<Route
				{...rest}
				render={routeProps => logged
					? <Component {...routeProps} />
					: <Redirect to={{ pathname: "/signin", state: { from: routeProps.location } }} />
				}
			/>
		);
	}
	return <Route component={Component} {...rest} />;
};
const mapStateToProps = (state: ReduxStoreState): WithAuthState => ({
	logged: isUserLogged(state),
});
export default connect<WithAuthState, void, AppRouteProps>(mapStateToProps, null)(AppRoute) as React.ComponentType<AppRouteProps>;
