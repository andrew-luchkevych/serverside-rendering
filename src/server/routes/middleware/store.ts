import { Response } from "express";
import RequestWithStore from "../../types/RequestWithStore";
import { RequestWithUser } from "../../types/RequestWithUser";
import { ReduxStoreState } from "../../../shared/types/store/RootReducer";
import { UserModel } from "../../models/User";
import configureStore from "../../../shared/redux/configureStore";
import { userInitialState } from "../../../shared/redux/user";
const withReduxStore = (req: RequestWithStore & RequestWithUser, res: Response, next: Function) => {
	const initialState: Partial<ReduxStoreState> = {};
	if (req.user) {
		initialState.user = {
			...userInitialState,
			logged: true,
			data: (req.user as UserModel).getData(),
		};
	}
	req.reduxStore = configureStore(initialState, true);
	next();
};

export default withReduxStore;