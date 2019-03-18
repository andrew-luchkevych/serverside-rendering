import * as React from "react";
import { Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { AppRouteProps } from "./types/RouteProps";
import Layout from "./components/Layout";
import AppRoute from "./routes/route";
import routes from "./routes";
import "./config/http";
export default class App extends React.Component {
	render() {
		return (
			<SnackbarProvider maxSnack={5} anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}>
				<Layout>
					<Switch>
						{
							routes.map((r: AppRouteProps, i) => <AppRoute {...r} key={i} />)
						}
					</Switch>
				</Layout>
			</SnackbarProvider>
		);
	}
}
