import { Response, Request } from "express";
/**
 * GET /api
 * List of API examples.
 */
export let getApi = (req: Request, res: Response) => {
	res.json({ user: req.user });
};
