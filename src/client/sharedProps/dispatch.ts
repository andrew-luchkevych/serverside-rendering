import Action from "./action";
export interface WithDispatch {
	dispatch: (action: Action) => void;
}

export default WithDispatch;