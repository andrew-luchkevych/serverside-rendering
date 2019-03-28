import { ReduxStoreState } from "../../types/store/RootReducer";

export const getOrderState = ({ order }: ReduxStoreState) => order;
export const isOrderLoaded = ({ order: { loaded } }: ReduxStoreState) => loaded;
export const getOrderId = ({ order: { data } }: ReduxStoreState) => data && data._id || undefined;