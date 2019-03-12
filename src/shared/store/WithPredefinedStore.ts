import { ReduxStore, ReduxPersistor } from ".";
export interface WithPredefinedStore {
	predefinedStore?: {
		store: ReduxStore;
		persistor: ReduxPersistor;
	};
}

export default WithPredefinedStore;