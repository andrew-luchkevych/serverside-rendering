import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout";
import routes from "./routes";

export default class App extends React.Component {
	render() {
		return (
			<Layout>
				<Switch>{routes.map((val: any, i) => <Route {...val} key={i} />)}</Switch>
			</Layout>
		);
	}
}
