import { dependencies as foodProviderDependencies } from "../../shared/types/FoodProvider";
import { dependencies as voteDependencies } from "../../shared/types/Order/OrderFoodProviderVote";
import { dependencies as rollStatsDependencies } from "../../shared/types/Order/OrderRollStats";
import foodProviderRoutines from "../../shared/redux/foodProviders/routines";
import foodTypesRoutines from "../../shared/redux/foodTypes/routines";
import orderRoutines from "../../shared/redux/order/routines";
import orderFoodProviderVotesRoutines from "../../shared/redux/orderFoodProviderVotes/routines";
import orderRollRoutines from "../../shared/redux/orderRoll/routines";
import orderRollStatsRoutines from "../../shared/redux/orderRollStats/routines";
import DataTypes from "../../shared/types/dataTypes";
import ReduxAction from "../../shared/types/store/action";

export type DataTypeDependencies = Partial<{
	[key in DataTypes]: Array<DataTypes>;
}>;

export const dataTypesDependencies: DataTypeDependencies = {
	foodProviders: foodProviderDependencies,
	orderRollStats: rollStatsDependencies,
	orderFoodProviderVotes: voteDependencies,
};

export const findDependentDataTypes = (dataType: DataTypes) => {
	const dependentDataTypes: Array<DataTypes> = [];
	Object.keys(dataTypesDependencies).forEach((key: DataTypes) => {
		if (dataTypesDependencies[key].includes(dataType)) {
			dependentDataTypes.push(key);
		}
	});
	return dependentDataTypes;
};

export type DataTypeRoutines = Partial<{
	[key in DataTypes]: any;
}>;

export const dataTypesRoutines: DataTypeRoutines = {
	foodProviders: foodProviderRoutines,
	foodTypes: foodTypesRoutines,
	order: orderRoutines,
	orderFoodProviderVotes: orderFoodProviderVotesRoutines,
	orderRoll: orderRollRoutines,
	orderRollStats: orderRollStatsRoutines,
};