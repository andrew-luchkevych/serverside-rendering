import * as React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import Loadable from "react-loadable";
import configureStore from "../shared/redux/configureStore";
import App from "./App";
import theme from "./theme";

declare global {
	interface IWindow {
		__INITIAL_STATE__: any;
		main: any;
	}
}
const initialState = { ...window.__INITIAL_STATE__ };
delete window.__INITIAL_STATE__;
const store = configureStore(initialState);
const renderApp = (Comp?: any) => {
	return hydrate(
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<BrowserRouter>
					<Comp />
				</BrowserRouter>
			</Provider>
		</MuiThemeProvider>,
		document.getElementById("app"),
	);
};

if ((module as any).hot) {
	(window as IWindow).main = () => {
		Loadable.preloadReady().then(() => {
			renderApp(App);
		});
	};

	(module as any).hot.accept("./App", () => {
		const NewApp = require("./App").default;
		renderApp(NewApp);
	});
} else {
	(window as IWindow).main = () => {
		Loadable.preloadReady().then(() => {
			renderApp(App);
		});
	};
}
