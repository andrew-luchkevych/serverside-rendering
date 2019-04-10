import * as React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import FoodTypeProps from "../../../../shared/types/FoodType";
import Loader from "../../../components/Loader";
import FoodTypeListItem from "./listItem";
export interface FoodTypesViewProps {
	loaded: boolean;
	loading: boolean;
	items: Array<FoodTypeProps>;
}

export class FoodTypesView extends React.PureComponent<FoodTypesViewProps> {
	mapper = (f: FoodTypeProps) => <FoodTypeListItem {...f} key={f._id} />;
	render() {
		const { items, loading, loaded } = this.props;
		if (loading && !loaded) {
			return <Loader />;
		}
		if (!items || !items.length || !loaded) {
			return (
				<Typography color="textSecondary" align="center">
					There is no food types yet.
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

export default FoodTypesView;