import { ReduxStore } from ".";
export interface WithPredefinedStore {
	predefinedStore?: {
		store: ReduxStore;
	};
}

export default WithPredefinedStore;