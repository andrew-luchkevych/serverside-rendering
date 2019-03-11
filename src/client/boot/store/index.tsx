import * as React from "react";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Provider } from "react-redux";
import WithPredefinedStore from "../../../shared/store/WithPredefinedStore";
import { Store, AnyAction } from "redux";
import { PersistedState, Persistor } from "redux-persist";
export interface StoreProviderProps extends WithPredefinedStore {
	children: React.ReactElement;
}
export class StoreProvider extends React.PureComponent<StoreProviderProps> {
	store: Store<PersistedState, AnyAction> & {
		dispatch: {};
	};
	persistor: Persistor;
	constructor(props: StoreProviderProps) {
		super(props);
		const { predefinedStore: pre } = props;
		if (pre) {
			const { store, persistor } = pre;
			this.store = store;
			this.persistor = persistor;
		} else {
			const { store, persistor } = require("./store");
			this.store = store;
			this.persistor = persistor;
		}

	}
	render() {
		return (
			<Provider store={this.store}>
				<PersistGate persistor={this.persistor}>
					{this.props.children}
				</PersistGate>
			</Provider>
		);
	}
};

export default StoreProvider;