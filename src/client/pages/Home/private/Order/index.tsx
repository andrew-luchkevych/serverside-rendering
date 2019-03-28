import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import WithDispatch from "../../../../../shared/types/store/dispatch";
import { OrderState } from "../../../../../shared/redux/order";
import routines from "../../../../../shared/redux/order/routines";
import { isOrderLoaded } from "../../../../../shared/redux/order/selectors";
import Padder from "../../../../components/Layout/Padder";
import Loader from "../../../../components/Loader/";
import OrderStats from "./stats";
import Vouting from "./vouting";
import { ReduxStoreState } from "../../../../../shared/types/store/RootReducer";
export interface OrderConnectedProps {
	loaded: boolean;
}
export class Order extends React.PureComponent<OrderConnectedProps & WithDispatch> {
	componentDidMount() {
		const { loaded, dispatch } = this.props;
		if (!loaded) {
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
})
export default connect<OrderConnectedProps, WithDispatch>(mapStateToProps)(Order) as React.ComponentType<{}>;