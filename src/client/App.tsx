import * as React from "react";
import { Switch } from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes";
import { AppRouteProps } from "./types/RouteProps";
import AppRoute from "./routes/route";
export default class App extends React.Component {
	render() {
		return (
			<Layout>
				<Switch>
					{
						routes.map((r: AppRouteProps, i) => <AppRoute {...r} key={i} />)
					}
				</Switch>
			</Layout>
		);
	}
}
