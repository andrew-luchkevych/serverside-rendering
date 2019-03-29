import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import WithDispatch from "../../../../../shared/types/store/dispatch";
import routines from "../../../../../shared/redux/order/routines";
import { isOrderLoaded } from "../../../../../shared/redux/order/selectors";
import { ReduxStoreState } from "../../../../../shared/types/store/RootReducer";
import { shouldDataBeReloaded } from "../../../../../shared/redux/forceReloadData/selectors";
import { pageDataTypes } from "../../../../App";
import Padder from "../../../../components/Layout/Padder";
import Loader from "../../../../components/Loader/";
import OrderStats from "./stats";
import Vouting from "./vouting";
export interface OrderConnectedProps {
	loaded: boolean;
	forceReload: boolean;
}
export class Order extends React.PureComponent<OrderConnectedProps & WithDispatch> {
	componentDidMount() {
		pageDataTypes.add("order");
		const { loaded, forceReload, dispatch } = this.props;
		if (!loaded || forceReload) {
			dispatch(routines.get.trigger());
		}
	}
	render() {
		const { loaded } = this.props;
		return (
			<Padder>
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

const mapStateToProps = (state: ReduxStoreState): OrderConnectedProps => ({
	loaded: isOrderLoaded(state),
	forceReload: shouldDataBeReloaded("order")(state),
});
export default connect<OrderConnectedProps, WithDispatch>(mapStateToProps)(Order) as React.ComponentType<{}>;