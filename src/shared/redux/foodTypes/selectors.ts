import { ReduxStoreState } from "../../types/store/RootReducer";
import FoodTypeProps from "../../types/FoodType";

export const foodTypes = ({ foodTypes }: ReduxStoreState) => ({ foodTypes });
export const byId = (id: string) => ({ foodTypes: { data } }: ReduxStoreState): FoodTypeProps | undefined => data.find(f => f._id === id);