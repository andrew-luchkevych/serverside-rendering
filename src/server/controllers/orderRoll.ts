import { Response } from "express";
import OrderRoll, { OrderRollModel } from "../models/OrderRoll";
import { RequestWithOrder } from "../types/request/RequestWithOrder";
import { RequestWithUser } from "../types/request/RequestWithUser";
import RequestWithStore from "../types/request/RequestWithStore";
import { ReduxStoreState } from "../../shared/types/store/RootReducer";
import configureStore from "../../shared/redux/configureStore";
import { success, error } from "../utils/api/index";

const addOrderRollToReduxStore = (req: RequestWithStore, orderRoll: OrderRollModel) => {
	if (!req.reduxStore) {
		return;
	}
	const state: Partial<ReduxStoreState> = req.reduxStore.getState();
	state.orderRoll = {
		processing: false,
		loaded: true,
		data: orderRoll.toObject(),
	};
	req.reduxStore = configureStore(state, true);
};

const get = (req: RequestWithUser & RequestWithOrder) => new Promise(
	(resolve: (orderRoll: OrderRollModel) => any, reject: (e: Error) => any) => {
		const userId = req.user._id;
		const orderId = req.order._id;
		OrderRoll.findOne({ userId, orderId }, (err, doc: OrderRollModel) => {
			if (err) {
				return reject(err);
			}
			if (!doc) {
				return reject(new Error("Order Roll not found!"));
			}
			resolve(doc);
		});
	},
);

const create = (req: RequestWithUser & RequestWithOrder): Promise<OrderRollModel> => {
	const userId = req.user._id;
	const orderId = req.order._id;
	const orderRoll = new OrderRoll({
		userId,
		orderId,
	});
	return orderRoll.save() as Promise<OrderRollModel>;
};

const getOrCreate = (req: RequestWithUser & RequestWithOrder) => new Promise(
	(resolve: (orderRoll: OrderRollModel) => any, reject: (e: Error) => any) => {
		get(req)
			.then((v) => resolve(v))
			.catch(() => {
				create(req)
					.then((v) => resolve(v))
					.catch((e) => reject(e));
			});
	},
);
export const withOrderRollMiddleware = (req: RequestWithStore & RequestWithUser & RequestWithOrder, res: Response, next) => {
	get(req).then(orderRoll => {
		addOrderRollToReduxStore(req, orderRoll);
		next();
	}).catch(() => {
		next();
	});
};

export const apiGet = (req: RequestWithUser & RequestWithOrder, res: Response) => {
	getOrCreate(req).then(orderRoll => success(res, orderRoll.toObject())).catch(e => error(res, e, 500));
};