import { Response } from "express";
import RequestWithStore from "../types/RequestWithStore";
import ssr from "../utils/ssr/index";
import FoodProviders from "../models/FoodProvider";
import configureStore from "../../shared/redux/configureStore";
export const getAll = async (req: RequestWithStore, res: Response) => {
	try {
		const foodProviders = await FoodProviders.find({});
		const state = req.reduxStore.getState();
		state.foodProviders.data = foodProviders.map(f => f.toObject());
		state.foodProviders.loaded = true;
		req.reduxStore = configureStore(state, true);
	} catch (e) {
		console.log(e);
	} finally {
		res.send(ssr(req));
	}
};

export const createPage = (req: RequestWithStore, res: Response) => {
	res.send(ssr(req));
};

export const editPage = (req: RequestWithStore, res: Response) => {
	FoodProviders.findById(req.params.id, (err, foodType) => {
		if (err) {
			return res.redirect(301, "/404");
		} else {
			const state = req.reduxStore.getState();
			state.foodProviders.data = [foodType.toObject()];
			state.foodProviders.loaded = false;
			req.reduxStore = configureStore(state, true);
			return res.send(ssr(req));
		}
	});
};