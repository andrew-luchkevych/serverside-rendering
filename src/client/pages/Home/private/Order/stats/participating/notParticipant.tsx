import * as React from "react";
import classNames from "classnames";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { ReduxStoreState } from "../../../../../../../shared/types/store/RootReducer";
import WithDispatch from "../../../../../../../shared/types/store/dispatch";
import { layout } from "../../../../../../theme";
import routines from "../../../../../../../shared/redux/orderRoll/routines";
import { isOrderRollProcessing } from "../../../../../../../shared/redux/orderRoll/selectors";
import Loader from "../../../../../../components/Loader/index";
export interface NotParticipantStyleProps {
	classes: {
		fullheight: string;
		flexRowCenter: string;
	};
}
export interface NotParticipantConnectedProps {
	processing: boolean;
}
export type NotParticipantProps = NotParticipantStyleProps & NotParticipantConnectedProps & WithDispatch;
export class NotParticipant extends React.PureComponent<NotParticipantProps> {
	participate = () => this.props.dispatch(routines.create.trigger());
	render() {
		const { classes, processing } = this.props;
		return (
			<Grid container direction="row" justify="flex-start" alignItems="center" style={{ flex: 1 }}>
				<Grid item className={classNames(classes.fullheight, classes.flexRowCenter)} style={{ flex: 1 }}>
					{
						processing
							? <Loader />
							: (
								<Button variant="contained" color="primary" className={classes.fullheight} onClick={this.participate}>
									Participate
								</Button>
							)
					}
				</Grid>
			</Grid>
		);
	}
}
const mapStateToProps = (state: ReduxStoreState): NotParticipantConnectedProps => ({
	processing: isOrderRollProcessing(state),
});
export default connect(mapStateToProps)(withStyles(layout)(NotParticipant)) as React.ComponentType<{}>;