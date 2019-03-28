import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { layout } from "../../../../../theme/index";
import { OrderRollStatsState } from "../../../../../../shared/redux/orderRollStats";
import { getOrderRollStatsState } from "../../../../../../shared/redux/orderRollStats/selectors";
import WithDispatch from "../../../../../../shared/types/store/dispatch";
import routines from "../../../../../../shared/redux/orderRollStats/routines";
import Loader from "../../../../../components/Loader";
import { ReduxStoreState } from "../../../../../../shared/types/store/RootReducer";
export interface DailyStatsStyleProps {
	classes: {
		fullheight: string;
		flexColumn: string;
		flexRowCenter: string;
	};
}
export interface DailyStatsConnectedProps {
	orderRollStats: OrderRollStatsState;
}
export class DailyStats extends React.PureComponent<DailyStatsStyleProps & DailyStatsConnectedProps & WithDispatch> {
	componentDidMount() {
		const { orderRollStats: { loaded }, dispatch } = this.props;
		if (!loaded) {
			dispatch(routines.get.trigger());
		}
	}
	render() {
		const { classes, orderRollStats: { loaded, data, processing } } = this.props;
		return (
			<Card className={classes.fullheight}>
				<CardContent className={classNames(classes.fullheight, classes.flexColumn)}>
					{
						!loaded || processing
							? <Loader />
							: (
								<React.Fragment>
									<Typography variant="h6" color="textSecondary">
										Daily Stats
									</Typography>
									<Typography>
										Participants: {" "}
										<b>{data.participants}</b>
									</Typography>
									<Typography>
										Rolled minimum: {" "}
										<b>{data.min || "-"}</b>
									</Typography>
									<Typography>
										Rolled maximum: {" "}
										<b>{data.max || "-"}</b>
									</Typography>
								</React.Fragment>
							)
					}
				</CardContent>
			</Card>
		);
	}
}
const mapStateToProps = (state: ReduxStoreState): DailyStatsConnectedProps => ({
	orderRollStats: getOrderRollStatsState(state),
});
export default connect(mapStateToProps)(withStyles(layout)(DailyStats)) as React.ComponentType<{}>;