import { ReduxStoreState } from "../../types/store/RootReducer";
export const loggedSelector = ({ user: { logged } }: ReduxStoreState) => ({ logged });
export const userSelector = ({ user: { data: user } }: ReduxStoreState) => ({ user });
export const userStateSelector = ({ user: userState }: ReduxStoreState) => ({ userState });