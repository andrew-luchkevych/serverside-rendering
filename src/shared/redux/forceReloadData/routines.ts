import { createRoutine } from "redux-saga-routines";
import { BasicRoutine } from "../../types/store/routine";
import DataTypes from "./types";
export interface ForceReloadDataTriggerProps {
	dataType: DataTypes;
}

export const add: BasicRoutine<ForceReloadDataTriggerProps> = createRoutine("FORCE_RELOAD_DATA/add");
export const remove: BasicRoutine<ForceReloadDataTriggerProps> = createRoutine("FORCE_RELOAD_DATA/remove");
export default {
	add,
	remove,
};