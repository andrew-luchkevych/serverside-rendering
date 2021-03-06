import { ReduxStoreState } from "../../types/store/RootReducer";
import DataTypes from "../../types/dataTypes";

export const shouldDataBeReloaded = (dataType: DataTypes) =>
	({ forceReloadData: { forceReload: f } }: ReduxStoreState): boolean =>
		f.has && f.has(dataType) || false;