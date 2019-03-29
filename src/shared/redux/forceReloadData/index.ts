import ReduxReducer from "../../types/store/reducer";
import routines from "./routines";
import { addToSetImmutable, removeFromSetImmutable } from "../../utils/set";
import DataTypes from "../../types/dataTypes";

export interface ForceReloadDataState {
	forceReload: Set<DataTypes>;
}

export const foodTypeInitialState: ForceReloadDataState = {
	forceReload: new Set(),
};
const ForceReloadDataReducer: ReduxReducer<ForceReloadDataState> = (state = foodTypeInitialState, action) => {
	switch (action.type) {
		case routines.add.SUCCESS:
			return {
				forceReload: addToSetImmutable<DataTypes>(action.payload.data.dataType, state.forceReload),
			};
		case routines.remove.SUCCESS:
			return {
				forceReload: removeFromSetImmutable<DataTypes>(action.payload.data.dataType, state.forceReload),
			};
		default: return state;
	}
};

export default ForceReloadDataReducer;