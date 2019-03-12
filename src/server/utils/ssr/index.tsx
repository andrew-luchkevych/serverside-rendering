import * as React from "react";
import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { Store } from "redux";
import { Provider } from "react-redux";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { StaticRouterContext } from "react-router";
import { getBundles } from "react-loadable/webpack";
import Loadable from "react-loadable";
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
	const withProvider = (
		<Provider store={req.reduxStore}>
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		</Provider>
	);
	const componentToRender: React.ReactElement = isProd ? (
		<Loadable.Capture report={getModules}>
			{withProvider}
		</Loadable.Capture>
	) : withProvider;
	const appHtml = renderToString(componentToRender);
	const helmet = Helmet.renderStatic();

	if (isProd) {
		const bundles = getBundles(stats, modules);
		const helmet = Helmet.renderStatic();
		return template({ bundles, helmet, data: req.reduxStore.getState(), content: appHtml });
	} else {
		return template({ helmet, content: appHtml, data: req.reduxStore.getState() });
	}
};

export default ssr;