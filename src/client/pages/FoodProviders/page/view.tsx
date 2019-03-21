import * as React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import FoodProviderProps from "../../../../shared/types/FoodProvider";
import Loader from "../../../components/Loader";
import FoodProviderListItem from "./listItem";
export interface FoodProvidersViewProps {
	loaded: boolean;
	loading: boolean;
	items: Array<FoodProviderProps>;
}

export default class FoodProvidersView extends React.PureComponent<FoodProvidersViewProps> {
	mapper = (f: FoodProviderProps) => <FoodProviderListItem {...f} key={f._id} />;
	render() {
		const { items, loading, loaded } = this.props;
		if (loading && !loaded) {
			return <Loader />;
		}
		if (!items || !items.length || !loaded) {
			return (
				<Typography color="textSecondary" align="center">
					There is no food providers yet.
				</Typography>
			);
		}
		return (
			<List>
				{loading && <Loader nopadding />}
				{items.map(this.mapper)}
			</List>
		);
	}
}