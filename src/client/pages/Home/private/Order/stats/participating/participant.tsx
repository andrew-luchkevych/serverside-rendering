import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { getOrderRollData, isOrderRollProcessing } from "../../../../../../../shared/redux/orderRoll/selectors";
import OrderRollProps from "../../../../../../../shared/types/Order/OrderRoll";
import { layout } from "../../../../../../theme";
import Loader from "../../../../../../components/Loader/index";
import WithDispatch from "../../../../../../../shared/types/store/dispatch";
import routines from "../../../../../../../shared/redux/orderRoll/routines";
import { ReduxStoreState } from "../../../../../../../shared/types/store/RootReducer";
export interface ParticipantStyleProps {
	classes: {
		fullheight: string;
		flexRowCenter: string;
	};
}
export interface ParticipantConnectedProps {
	processing: boolean;
	data?: OrderRollProps;
}
export type ParticipantProps = ParticipantStyleProps & ParticipantConnectedProps & WithDispatch;
export class Participant extends React.PureComponent<ParticipantProps> {
	cancelParticipation = () => this.props.dispatch(routines.remove.trigger());
	render() {
		const { classes, data, processing } = this.props;
		if (!data) {
			return null;
		}
		if (processing) {
			return <Grid container><Loader /></Grid>;
		}
		return (
			<Grid container direction="row" justify="center" alignItems="center" style={{ flex: 1 }}>
				<Grid item style={{ paddingRight: 5 }}>
					<Typography>
						Rolled: {" "}
						<b>{data.roll}</b>
					</Typography>
				</Grid>
				<Grid item className={classNames(classes.fullheight, classes.flexRowCenter)} style={{ flex: 1 }}>
					<Button variant="contained" color="secondary" className={classes.fullheight} onClick={this.cancelParticipation}>
						Cancel participation
					</Button>
				</Grid>
			</Grid>
		);
	}
}
const mapStateToProps = (state: ReduxStoreState): ParticipantConnectedProps => ({
	processing: isOrderRollProcessing(state),
	data: getOrderRollData(state),
});
export default connect(mapStateToProps)(withStyles(layout)(Participant)) as React.ComponentType<{}>;