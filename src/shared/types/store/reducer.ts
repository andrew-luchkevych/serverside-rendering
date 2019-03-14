import Action from "./action";

export type ReduxReducer<T> = (state: T, action: Action) => T;

export default ReduxReducer;