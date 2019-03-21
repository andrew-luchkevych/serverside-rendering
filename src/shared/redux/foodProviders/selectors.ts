import { ReduxStoreState } from "../../types/store/RootReducer";
import FoodProviderProps from "../../types/FoodProvider";

export const foodProviders = ({ foodProviders }: ReduxStoreState) => ({ foodProviders });
export const byId = (id: string) => ({ foodProviders: { data } }: ReduxStoreState): FoodProviderProps | undefined => data.find(f => f._id === id);