import { Response, NextFunction } from "express";
import OrderRoll, { OrderRollModel } from "../models/OrderRoll";
import { RequestWithOrder } from "../types/request/RequestWithOrder";
import { RequestWithUser } from "../types/request/RequestWithUser";
import RequestWithStore from "../types/request/RequestWithStore";
import { ReduxStoreState } from "../../shared/types/store/RootReducer";
import configureStore from "../../shared/redux/configureStore";
import { success, error } from "../utils/api/index";
import OrderRollProps from "../../shared/types/Order/OrderRoll";
import { OrderRollStatsProps } from "../../shared/types/Order/OrderRollStats";
import socketService from "../sockets";
import { removeVotesOfUserFromOrder } from "./orderFoodProviderVote";
const notFoundError = new Error("Order Roll not found!");
const addOrderRollToReduxStore = (req: RequestWithStore, orderRoll?: OrderRollModel) => {
	if (!req.reduxStore) {
		return;
	}
	const state: Partial<ReduxStoreState> = req.reduxStore.getState();
	state.orderRoll = {
		processing: false,
		loaded: true,
		data: undefined,
	};
	if (orderRoll) {
		state.orderRoll.data = orderRoll.toObject();
	}
	req.reduxStore = configureStore(state, true);
};
const addOrderRollStatsToReduxStore = (req: RequestWithStore, orderRollStats: OrderRollStatsProps) => {
	if (!req.reduxStore) {
		return;
	}
	const state: Partial<ReduxStoreState> = req.reduxStore.getState();
	state.orderRollStats = {
		processing: false,
		loaded: true,
		data: orderRollStats,
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
				return reject(notFoundError);
			}
			resolve(doc);
		});
	},
);

const create = (req: RequestWithUser & RequestWithOrder): Promise<OrderRollModel> => {
	const userId = req.user._id;
	const orderId = req.order._id;
	const roll = Math.floor(Math.random() * Math.floor(100));
	const orderRollData: OrderRollProps = {
		userId,
		orderId,
		roll,
		active: true,
	};
	const orderRoll = new OrderRoll(orderRollData);
	return orderRoll.save() as Promise<OrderRollModel>;
};

const getOrCreate = (req: RequestWithUser & RequestWithOrder) => new Promise(
	(resolve: (orderRoll: OrderRollModel) => any, reject: (e: Error) => any) => {
		get(req)
			.then((v) => {
				if (!v.active) {
					v.active = true;
					v.save();
				}
				resolve(v);
			})
			.catch(() => {
				create(req)
					.then((v) => resolve(v))
					.catch((e) => reject(e));
			});
	},
);

const getStats = async (req: RequestWithUser & RequestWithOrder) => {
	const stats: OrderRollStatsProps = {
		orderId: req.order._id,
		min: undefined,
		max: undefined,
		participants: 0,
	};
	const docs = await OrderRoll.find({ orderId: req.order._id.toString(), active: true }) as Array<OrderRollModel>;
	stats.participants = docs.length;
	if (stats.participants) {
		stats.min = 100;
		stats.max = 0;
		for (let i = 0; i < stats.participants; i++) {
			const { roll } = docs[i];
			if (stats.min > roll) {
				stats.min = roll;
			}
			if (stats.max < roll) {
				stats.max = roll;
			}
		}
	}
	return stats;
};
export const withOrderRollMiddleware = (req: RequestWithStore & RequestWithUser & RequestWithOrder, _res: Response, next: NextFunction) => {
	get(req).then(orderRoll => {
		addOrderRollToReduxStore(req, orderRoll.active ? orderRoll : undefined);
		next();
	}).catch(() => {
		addOrderRollToReduxStore(req);
		next();
	});
};

export const withOrderRollStatsMiddleware = (req: RequestWithStore & RequestWithUser & RequestWithOrder, _res: Response, next: NextFunction) => {
	getStats(req).then((stats) => {
		addOrderRollStatsToReduxStore(req, stats);
		next();
	});
};

export const apiGet = (req: RequestWithUser & RequestWithOrder, res: Response) => {
	get(req).then(orderRoll => {
		if (orderRoll.active) {
			success(res, orderRoll.toObject());
		} else {
			error(res, "", 404);
		}
	}).catch(() => error(res, "", 404));
};
export const apiPost = (req: RequestWithUser & RequestWithOrder, res: Response) => {
	getOrCreate(req).then(orderRoll => {
		success(res, orderRoll.toObject());
		socketService.updateDataType(req.user._id, "orderRoll");
	}).catch(e => error(res, e));
};
export const apiDelete = (req: RequestWithUser & RequestWithOrder, res: Response) => {
	const msg = "Your participating in today order canceled.";
	get(req).then((orderRoll) => {
		orderRoll.active = false;
		orderRoll.save().then(() => {
			return removeVotesOfUserFromOrder(req.user._id, req.order._id).then(() => {
				success(res, {}, msg);
				socketService.updateDataType(req.user._id, "orderFoodProviderVotes");
				socketService.updateDataType(req.user._id, "orderRoll");
			});
		});
	}).catch((e) => {
		error(res, e);
	});
};

export const apiGetStats = (req: RequestWithUser & RequestWithOrder, res: Response) => {
	getStats(req).then(stats => success(res, stats));
};