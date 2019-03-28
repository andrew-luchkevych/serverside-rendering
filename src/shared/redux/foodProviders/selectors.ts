import { ReduxStoreState } from "../../types/store/RootReducer";
import FoodProviderProps from "../../types/FoodProvider";

export const getFoodProvidersState = ({ foodProviders }: ReduxStoreState) => foodProviders;
export const getFoodProviderById = (id: string) =>
	({ foodProviders: { data } }: ReduxStoreState): FoodProviderProps | undefined =>
		data.find(f => f._id === id);