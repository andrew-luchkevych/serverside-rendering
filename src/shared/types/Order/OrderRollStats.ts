import DataTypes from "../dataTypes";

export interface OrderRollStatsProps {
	orderId: string;
	participants: number;
	max?: number;
	min?: number;
}

export const dependencies: Array<DataTypes> = ["orderRoll"];
export default OrderRollStatsProps;