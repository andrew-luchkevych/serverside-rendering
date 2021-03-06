import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import WithDispatch from "../../../../../../../shared/types/store/dispatch";
import { isOrderRollLoaded, getOrderRollData } from "../../../../../../../shared/redux/orderRoll/selectors";
import { get } from "../../../../../../../shared/redux/orderRoll/routines";
import { ReduxStoreState } from "../../../../../../../shared/types/store/RootReducer";
import OrderRollProps from "../../../../../../../shared/types/Order/OrderRoll";
import { shouldDataBeReloaded } from "../../../../../../../shared/redux/forceReloadData/selectors";
import { pageDataTypes } from "../../../../../../App";
import { layout } from "../../../../../../theme";
import Loader from "../../../../../../components/Loader/index";
import Participant from "./participant";
import NotParticipant from "./notParticipant";
export interface ParticipatingStatsStyleProps {
	classes: {
		fullheight: string;
		flexColumn: string;
	};
}
export interface ParticipatingStatsConnectedProps {
	loaded: boolean;
	stats?: OrderRollProps;
	forceReload: boolean;
}
export type ParticipatingStatsProps = ParticipatingStatsStyleProps & ParticipatingStatsConnectedProps & WithDispatch;
export class ParticipatingStats extends React.PureComponent<ParticipatingStatsProps> {
	componentDidMount() {
		pageDataTypes.add("orderRollStats");
		const { loaded, forceReload, dispatch } = this.props;
		if (!loaded || forceReload) {
			dispatch(get.trigger());
		}
	}
	render() {
		const { classes, stats, loaded } = this.props;
		return (
			<Card className={classes.fullheight}>
				<CardContent className={classNames(classes.fullheight, classes.flexColumn)}>
					<Typography variant="h6" color="textSecondary">
						Your stats
					</Typography>
					{
						loaded
							? stats
								? <Participant />
								: <NotParticipant />
							: <Loader />
					}
				</CardContent>
			</Card>
		);
	}
}
const mapStateToProps = (state: ReduxStoreState): ParticipatingStatsConnectedProps => ({
	loaded: isOrderRollLoaded(state),
	stats: getOrderRollData(state),
	forceReload: shouldDataBeReloaded("orderRollStats")(state),
});
export default connect(mapStateToProps)(withStyles(layout)(ParticipatingStats)) as React.ComponentType<{}>;