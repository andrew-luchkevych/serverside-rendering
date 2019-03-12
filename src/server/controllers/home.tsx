import * as React from "react";
import express, { Request, Response } from "express";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { matchRoutes } from "react-router-config";
import configureStore from "../../client/redux/configureStore";
import App from "../../client/App";
import routes from "../../client/routes";
import template from "../template";

const router = express.Router();
/**
 * GET /
 * Home page.
 */
export let index = async (req: Request, res: Response) => {
	const context: any = {};
	const url: string = req.url.split(/[?#]/)[0];
	const store = configureStore();

	const branch = matchRoutes(routes, url);

	const promises = await branch.map(async (route) => {
		const component: any = route.route.component;
		if (component.preload && component.preload instanceof Function) {
			const data = await component.preload();
			const fetchData = data.default.fetchData;
			return fetchData instanceof Function ? fetchData({ store, req }) : Promise.resolve(null);
		}

		if (component.fetchData instanceof Function) {
			return component.fetchData({ store, req });
		}
	});

	return Promise.all(promises).then(() => {
		const appHtml = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					<App />
				</StaticRouter>
			</Provider>,
		);

		if (context.status === 404) {
			res.status(404);
		}
		if (context.status === 301 || context.status === 302) {
			return res.redirect(context.status, context.url);
		}

		const helmet = Helmet.renderStatic();
		const html = template({ helmet, content: appHtml, data: store.getState() });

		res.send(html);
	});
};
export default router;