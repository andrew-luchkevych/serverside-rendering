import * as React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { AppRouteProps } from "../types/RouteProps";
import { loggedSelector } from "../../shared/redux/user/selectors";

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
export default connect<WithAuthState, void, AppRouteProps>(loggedSelector, null)(AppRoute) as React.ComponentType<AppRouteProps>;
