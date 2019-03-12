import { createStore } from 'redux';
import reducers from './reducers';

const configureStore = (preloadedState?: any): any => {
	const store = createStore(reducers, preloadedState);

	if ((module as any).hot) {
		(module as any).hot.accept('./reducers', () => {
			const nextReducer = require('./reducers').default;
			store.replaceReducer(nextReducer);
		});
	}

	return store;
};

export default configureStore;
