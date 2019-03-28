import { FormReducer, FormStateMap } from "redux-form";
import { UserState } from "../../redux/user";
import { FoodTypesState } from "../../redux/foodTypes";
import { FoodProvidersState } from "../../redux/foodProviders";
import { ForceReloadDataState } from "../../redux/forceReloadData";
import { OrderState } from "../../redux/order";
import { OrderRollState } from "../../redux/orderRoll";
import { OrderRollStatsState } from "../../redux/orderRollStats";
import { OrderFoodProviderVoteState } from "../../redux/orderFoodProviderVotes";
import ReduxReducer from "./reducer";
export interface RootReduser {
	form: FormReducer;
	user: ReduxReducer<UserState>;
	foodTypes: ReduxReducer<FoodTypesState>;
	foodProviders: ReduxReducer<FoodProvidersState>;
	forceReloadData: ReduxReducer<ForceReloadDataState>;
	order: ReduxReducer<OrderState>;
	orderRoll: ReduxReducer<OrderRollState>;
	orderRollStats: ReduxReducer<OrderRollStatsState>;
	orderFoodProviderVotes: ReduxReducer<OrderFoodProviderVoteState>;
}

export interface ReduxStoreState {
	form: FormStateMap;
	user: UserState;
	foodTypes: FoodTypesState;
	foodProviders: FoodProvidersState;
	forceReloadData: ForceReloadDataState;
	order: OrderState;
	orderRoll: OrderRollState;
	orderRollStats: OrderRollStatsState;
	orderFoodProviderVotes: OrderFoodProviderVoteState;
}