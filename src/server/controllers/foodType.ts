import { Request, Response } from "express";
import RequestWithStore from "../types/RequestWithStore";
import ssr from "../utils/ssr/index";
import FoodTypes from "../models/FoodTypes";
import routines from "../../shared/redux/foodType/routines";
import createPayload from "../../shared/redux/createPayload";
import configureStore from "../../shared/redux/configureStore";
export const getAll = (req: RequestWithStore, res: Response) => {
	FoodTypes.find({}, (err, foodTypes) => {
		console.log(foodTypes);
		if (!err) {
			const state = req.reduxStore.getState();
			state.foodType.data = foodTypes.map(f => f.toObject());
			req.reduxStore = configureStore(state, true);
		}
		res.send(ssr(req));
	});
};