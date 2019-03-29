import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import DataTypes from "../../types/dataTypes";
export interface ForceReloadDataTriggerProps {
	dataType: DataTypes;
}

export const add: BasicRoutine<ForceReloadDataTriggerProps, void, ForceReloadDataTriggerProps> = createRoutine("FORCE_RELOAD_DATA/add");
export const remove: BasicRoutine<ForceReloadDataTriggerProps, void, ForceReloadDataTriggerProps> = createRoutine("FORCE_RELOAD_DATA/remove");
export default {
	add,
	remove,
};