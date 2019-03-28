import { Response } from "express";
import OrderFoodProviderVote, { OrderFoodProviderVoteModel } from "../models/OrderFoodProviderVote";
import { RequestWithUser } from "../types/request/RequestWithUser";
import { RequestWithOrder } from "../types/request/RequestWithOrder";
import { success, error } from "../utils/api/index";
import FoodProvider from "../models/FoodProvider";
import OrderFoodProviderVoteProps from "../../shared/types/Order/OrderFoodProviderVote";
import RequestWithStore from "../types/request/RequestWithStore";
import OrderFoodProviderVoteReducer from "../../shared/redux/orderFoodProviderVotes";
import createPayload from "../../shared/redux/createPayload";
import routines from "../../shared/redux/orderFoodProviderVotes/routines";
import configureStore from "../../shared/redux/configureStore";
const getVotes = (req: RequestWithUser & RequestWithOrder) => new Promise(
	(resolve: (data: OrderFoodProviderVoteModel[]) => any, reject: (e: Error) => any) => {
		OrderFoodProviderVote.find({ orderId: req.order._id }).then((results: OrderFoodProviderVoteModel[]) => {
			resolve(results);
		}).catch(e => reject(e));
	},
);

export const updateStoreStateWithOrderFoodProviderVotes = (req: RequestWithStore) =>
	getVotes(req).then((votes) => {
		const state = req.reduxStore.getState();
		state.orderFoodProviderVotes = OrderFoodProviderVoteReducer(undefined, {
			type: routines.get.SUCCESS,
			payload: createPayload(votes.map(v => v.toObject())),
		});
		req.reduxStore = configureStore(state, true);
	});

export const withOrderFoodProviderVotesMiddleware = async (req: RequestWithStore, _res: Response, next) => {
	updateStoreStateWithOrderFoodProviderVotes(req).then(() => next()).catch(e => next(e));
};
export const apiGet = (req: RequestWithUser & RequestWithOrder, res: Response) => {
	getVotes(req).then(data => res.json(data.map(v => v.toObject()))).catch(e => error(res, e, 500));
};

export const apiPost = (req: RequestWithUser & RequestWithOrder, res: Response) => {
	const foodProviderId = req.body.foodProviderId || undefined;
	if (!foodProviderId) {
		return error(res, new Error("Food Provider ID is required"));
	}
	FoodProvider.findById(foodProviderId).then(() => {
		const vote: OrderFoodProviderVoteProps = {
			user: req.user._id,
			orderId: req.order._id,
			foodProviderId,
		};
		OrderFoodProviderVote.create(vote).then((v) => {
			success(res, v.toObject());
		}).catch(e => error(res, e));
	}).catch(() => error(res, "Cant find that Food Provider"));
};

export const apiDelete = (req: RequestWithUser & RequestWithOrder, res: Response) => {
	const foodProviderId = req.body.foodProviderId || undefined;
	if (!foodProviderId) {
		return error(res, new Error("Food Provider ID is required"));
	}
	FoodProvider.findById(foodProviderId).then(() => {
		OrderFoodProviderVote.findOne({ user: req.user._id, orderId: req.order._id, foodProviderId }).then((vote) => {
			OrderFoodProviderVote.remove(vote).then(() => {
				success(res);
			}).catch(e => error(res, e));
		}).catch(() => error(res, "You didnt vote for that Food Provider"));
	}).catch(() => error(res, "Cant find that Food Provider"));
};