import { ReduxStoreState } from "../../types/store/RootReducer";

export const getOrderRollState = ({ orderRoll }: ReduxStoreState) => orderRoll;
export const getOrderRollData = ({ orderRoll: { data } }: ReduxStoreState) => data;
export const isOrderRollLoaded = ({ orderRoll: { loaded } }: ReduxStoreState) => loaded;
export const isOrderRollProcessing = ({ orderRoll: { processing } }: ReduxStoreState) => processing;