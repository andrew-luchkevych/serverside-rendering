import { ReduxStoreState } from "../../types/store/RootReducer";

export const getOrderRollStatsState = ({ orderRollStats }: ReduxStoreState) => orderRollStats;
export const getOrderRollStatsData = ({ orderRollStats: { data } }: ReduxStoreState) => data;
export const isOrderRollLoaded = ({ orderRollStats: { loaded } }: ReduxStoreState) => loaded;
export const isOrderRollProcessing = ({ orderRollStats: { processing } }: ReduxStoreState) => processing;