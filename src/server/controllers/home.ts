import { Request, Response } from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import App from "../../client/index";
import html from "../../client/html";
/**
 * GET /
 * Home page.
 */
export let index = (req: Request, res: Response) => {
	res.send(html(renderToString(React.createElement(App))));
};
