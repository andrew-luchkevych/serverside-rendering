import { Response } from "express";
import RequestWithStore from "../../types/RequestWithStore";
import ssr from "./index";
export const ssrPage = (req: RequestWithStore, res: Response) => res.send(ssr(req));