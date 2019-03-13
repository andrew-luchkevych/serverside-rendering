import * as React from "react";
import path from "path";
import fs from "fs";
import JssProvider from "react-jss/lib/JssProvider";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { SheetsRegistry } from "jss";
import {
	MuiThemeProvider,
	createMuiTheme,
	createGenerateClassName,
} from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import { StaticRouterContext } from "react-router";
import { getBundles } from "react-loadable/webpack";
import theme from "../../../client/theme";
import App from "../../../client/App";
import template from "../../template";
import RequestWithStore from "../../types/RequestWithStore";
const isProd = process.env.NODE_ENV === "production";
const modules: Array<string> = [];
const getModules = (moduleName: string) => modules.push(moduleName);

let stats: any = {};

if (isProd) {
	if (fs.existsSync(path.resolve(__dirname, "../../../../dist/js/react-loadable.json"))) {
		stats = import(path.resolve(__dirname, "../../../../dist/js/react-loadable.json"));
	}
}

export const ssr = (req: RequestWithStore) => {
	const context: StaticRouterContext = {};
	const sheetsRegistry = new SheetsRegistry();
	const sheetsManager = new Map();
	const generateClassName = createGenerateClassName();
	const component = (
		<JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
			<MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
				<Provider store={req.reduxStore}>
					<StaticRouter location={req.url} context={context}>
						<App />
					</StaticRouter>
				</Provider>
			</MuiThemeProvider>
		</JssProvider>

	);
	const componentToRender: React.ReactElement = isProd ? (
		<Loadable.Capture report={getModules}>
			{component}
		</Loadable.Capture>
	) : component;
	const appHtml = renderToString(componentToRender);
	const helmet = Helmet.renderStatic();
	const styles = sheetsRegistry.toString();
	if (isProd) {
		const bundles = getBundles(stats, modules);
		const helmet = Helmet.renderStatic();
		return template({ bundles, helmet, data: req.reduxStore.getState(), content: appHtml, styles });
	} else {
		const t = template({ helmet, content: appHtml, data: req.reduxStore.getState(), styles });
		return t;
	}
};

export default ssr;