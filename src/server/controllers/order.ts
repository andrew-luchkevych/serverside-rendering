import { Request, Response } from "express";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "../../shared/types/date";
import Order, { OrderModel } from "../models/Order";
import RequestWithStore from "../types/request/RequestWithStore";
import { ReduxStoreState } from "../../shared/types/store/RootReducer";
import configureStore from "../../shared/redux/configureStore";
import { RequestWithOrder } from "../types/request/RequestWithOrder";
import { success, error } from "../utils/api";

const addOrderToReduxStore = (req: RequestWithStore, order: OrderModel) => {
	if (!req.reduxStore) {
		return;
	}
	const state: Partial<ReduxStoreState> = req.reduxStore.getState();
	state.order = {
		processing: false,
		loaded: true,
		data: order.toObject(),
	};
	req.reduxStore = configureStore(state, true);
};

const getOrCreate = () => {
	return new Promise(
		(resolve: (order: OrderModel) => any, reject: (e: Error) => any) => {
			Order.findOne({ date: moment().format(DEFAULT_DATE_FORMAT) }, (err, doc: OrderModel) => {
				if (err || !doc) {
					const order = new Order();
					order.save().then((o: OrderModel) => {
						resolve(o);
					}).catch(e => reject(e));
				} else {
					resolve(doc);
				}
			});
		},
	);
};
export const withOrderMiddleware = (req: RequestWithStore & RequestWithOrder, res: Response, next) => {
	getOrCreate().then(order => {
		req.order = order;
		addOrderToReduxStore(req, order);
		next();
	}).catch(e => next(e));
};

export const apiGet = (_req: Request, res: Response) => {
	getOrCreate().then(order => success(res, order.toObject())).catch(e => error(res, e, 500));
};