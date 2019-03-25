import * as React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import WithDispatch from "../../../../../shared/types/store/dispatch";
import { OrderState } from "../../../../../shared/redux/order";
import routines from "../../../../../shared/redux/order/routines";
import { order } from "../../../../../shared/redux/order/selectors";
import Padder from "../../../../components/Layout/Padder";
import Loader from "../../../../components/Loader/";
import OrderStats from "./stats";
import Vouting from "./vouting";
export interface OrderConnectedProps {
	order: OrderState;
}
export class Order extends React.PureComponent<OrderConnectedProps & WithDispatch> {
	componentDidMount() {
		const { order: { data, loaded }, dispatch } = this.props;
		if (!loaded || !data) {
			dispatch(routines.get.trigger());
		}
	}
	render() {
		const { order: { data, loaded } } = this.props;
		return (
			<Padder>
				<Typography variant="h4" align="center" gutterBottom>
					Order
				</Typography>
				{
					data && loaded
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

export default connect<OrderConnectedProps, WithDispatch>(order)(Order) as React.ComponentType<{}>;