import { ReduxStoreState } from "../../types/store/RootReducer";
import FoodTypeProps from "../../types/FoodType";

export const getFoodTypesState = ({ foodTypes }: ReduxStoreState) => foodTypes;
export const getFoodTypeById = (id: string) => ({ foodTypes: { data } }: ReduxStoreState): FoodTypeProps | undefined => data.find(f => f._id === id);