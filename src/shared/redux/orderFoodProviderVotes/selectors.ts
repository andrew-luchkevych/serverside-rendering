import { ReduxStoreState } from "../../types/store/RootReducer";

export const orderFoodProviderVotesState = ({ orderFoodProviderVotes }: ReduxStoreState) => orderFoodProviderVotes;
export const isOrderFoodProviderVotesLoadedSelector = ({ orderFoodProviderVotes: { loaded } }: ReduxStoreState) => loaded;
export const isOrderFoodProviderVotesProcessingSelector = ({ orderFoodProviderVotes: { processing } }: ReduxStoreState) => processing;
export const orderFoodProviderVotesDataSelector = ({ orderFoodProviderVotes: { data } }: ReduxStoreState) => data;