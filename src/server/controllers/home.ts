import { Response } from "express";
import RequestWithStore from "../types/RequestWithStore";
import ssr from "../utils/ssr/index";
/**
 * GET /
 * Home page.
 */
export const index = (req: RequestWithStore, res: Response) => {
	res.send(ssr(req));
};
export default {
	index,
};