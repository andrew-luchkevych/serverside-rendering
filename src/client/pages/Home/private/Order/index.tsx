import * as React from "react";
import Padder from "../../../../components/Layout/Padder";
import Typography from "@material-ui/core/Typography";
import OrderStats from "./stats/index";
export const Order = () => (
	<Padder>
		<Typography variant="h4" align="center" gutterBottom>
			Order
		</Typography>
		<OrderStats />
	</Padder>
);

export default Order;