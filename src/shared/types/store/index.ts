import { Store, AnyAction } from "redux";
import { ReduxStoreState } from "./RootReducer";

export interface ReduxStore extends Store<ReduxStoreState, AnyAction> { }