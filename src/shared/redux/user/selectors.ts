import { ReduxStoreState } from "../../types/store/RootReducer";
export const isUserLogged = ({ user: { logged } }: ReduxStoreState) => logged;
export const getUserData = ({ user: { data } }: ReduxStoreState) => data;
export const getUserState = ({ user: userState }: ReduxStoreState) => userState;
export const getUserId = ({ user: userState }: ReduxStoreState) =>
	userState.logged
	&& userState.data
	&& userState.data._id || undefined;