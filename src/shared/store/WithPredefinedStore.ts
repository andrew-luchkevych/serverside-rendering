import { Store, AnyAction } from "redux";
import { PersistedState, Persistor } from "redux-persist";
export interface WithPredefinedStore {
	predefinedStore?: {
		store: Store<PersistedState, AnyAction> & {
			dispatch: {};
		};
		persistor: Persistor;
	};
}

export default WithPredefinedStore;