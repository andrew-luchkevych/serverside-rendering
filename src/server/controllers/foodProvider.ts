import { Response } from "express";
import RequestWithStore from "../types/request/RequestWithStore";
import ssr from "../utils/ssr/index";
import FoodProviders from "../models/FoodProvider";
import configureStore from "../../shared/redux/configureStore";
import FoodProviderProps from "../../shared/types/FoodProvider";
export const updateStoreStateWithFoodProviders = (req: RequestWithStore) =>
	new Promise(
		(resolve: (foodProviders: Array<FoodProviderProps>) => any, reject: (e: Error) => any) => {
			FoodProviders.find({}, (e, res) => {
				if (e) {
					reject(e);
				}
				const state = req.reduxStore.getState();
				const foodProviders = res.map(f => f.toObject());
				state.foodProviders.data = foodProviders;
				state.foodProviders.loaded = true;
				req.reduxStore = configureStore(state, true);
				resolve(foodProviders);
			});
		},
	);
export const withFoodProvidersMiddleware = async (req: RequestWithStore, _res: Response, next) => {
	updateStoreStateWithFoodProviders(req).then(() => next()).catch(e => next(e));
};
export const getAll = async (req: RequestWithStore, res: Response) => {
	await updateStoreStateWithFoodProviders(req);
	res.send(ssr(req));
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