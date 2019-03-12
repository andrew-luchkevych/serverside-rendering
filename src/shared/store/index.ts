import { Store, AnyAction } from "redux";
import { PersistedState } from "redux-persist";
export interface ReduxStore extends Store<PersistedState, AnyAction> { }
export { Persistor as ReduxPersistor } from "redux-persist";