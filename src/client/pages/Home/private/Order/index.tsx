import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import WithDispatch from "../../../../../shared/types/store/dispatch";
import routines from "../../../../../shared/redux/order/routines";
import { isOrderLoaded } from "../../../../../shared/redux/order/selectors";
import { ReduxStoreState } from "../../../../../shared/types/store/RootReducer";
import { shouldDataBeReloaded } from "../../../../../shared/redux/forceReloadData/selectors";
import { pageDataTypes } from "../../../../App";
import Padder from "../../../../components/Layout/Padder";
import Loader from "../../../../components/Loader/";
import { layout } from "../../../../theme/index";
import OrderStats from "./stats";
import Vouting from "./vouting";
export interface OrderStyleProps {
	classes: {
		fullHeightHiddenOverflow: string;
		flexColumn: string;
	};
}
export interface OrderConnectedProps {
	loaded: boolean;
	forceReload: boolean;
}

export type OrderProps = OrderStyleProps & OrderConnectedProps & WithDispatch;
export class Order extends React.PureComponent<OrderProps> {
	componentDidMount() {
		pageDataTypes.add("order");
		const { loaded, forceReload, dispatch } = this.props;
		if (!loaded || forceReload) {
			dispatch(routines.get.trigger());
		}
	}
	render() {
		const { loaded, classes } = this.props;
		return (
			<Padder className={classNames(classes.fullHeightHiddenOverflow, classes.flexColumn)}>
				<Typography variant="h4" align="center" gutterBottom>
					Order
				</Typography>
				{
					loaded
						? (
							<React.Fragment>
								<OrderStats />
								<Vouting />
							</React.Fragment>
						) : <Loader />
				}

			</Padder>
		);
	}
}

export const mapStateToProps = (state: ReduxStoreState): OrderConnectedProps => ({
	loaded: isOrderLoaded(state),
	forceReload: shouldDataBeReloaded("order")(state),
});
export default connect<OrderConnectedProps, WithDispatch>(mapStateToProps)(withStyles(layout)(Order)) as React.ComponentType;