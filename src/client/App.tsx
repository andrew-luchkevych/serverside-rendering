import * as React from "react";
import { Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { config } from "../shared/config/http";
import { AppRouteProps } from "./types/RouteProps";
import Layout from "./components/Layout";
import AppRoute from "./routes/route";
import routes from "./routes";
import SocketProvider from "./SocketProvider";
import DataTypes from "../shared/types/dataTypes";
export const pageDataTypes: Set<DataTypes> = new Set();
export class App extends React.Component<RouteComponentProps> {
	componentDidMount() {
		config();
	}
	componentDidUpdate(prevProps: RouteComponentProps) {
		if (this.props.location !== prevProps.location) {
			this.onRouteChanged();
		}
	}

	onRouteChanged() {
		pageDataTypes.clear();
	}
	render() {
		return (
			<SocketProvider>
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
			</SocketProvider>
		);
	}
}

export default withRouter(App) as React.ComponentType;
