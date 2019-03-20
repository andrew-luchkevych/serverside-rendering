import { Response } from "express";
import RequestWithStore from "../types/RequestWithStore";
import ssr from "../utils/ssr/index";
import FoodTypes from "../models/FoodTypes";
import configureStore from "../../shared/redux/configureStore";
export const getAll = (req: RequestWithStore, res: Response) => {
	FoodTypes.find({}, (err, foodTypes) => {
		if (!err) {
			const state = req.reduxStore.getState();
			state.foodTypes.data = foodTypes.map(f => f.toObject());
			state.foodTypes.loaded = true;
			req.reduxStore = configureStore(state, true);
		}
		res.send(ssr(req));
	});
};

export const createPage = (req: RequestWithStore, res: Response) => {
	res.send(ssr(req));
};

export const editPage = (req: RequestWithStore, res: Response) => {
	FoodTypes.findById(req.params.id, (err, foodType) => {
		if (err) {
			return res.redirect(301, "/404");
		} else {
			const state = req.reduxStore.getState();
			state.foodTypes.data = [foodType.toObject()];
			req.reduxStore = configureStore(state, true);
			return res.send(ssr(req));
		}
	});
};