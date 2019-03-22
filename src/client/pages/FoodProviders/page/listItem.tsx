import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import WithDispatch from "../../../../shared/types/store/dispatch";
import FoodProviderProps from "../../../../shared/types/FoodProvider";
import LinkedIconButton from "../../../components/Linked/LinkedIconButton/index";
import routines from "../../../../shared/redux/foodProviders/routines";
import ConfirmationDialog, { ConfirmationDialogControllerProps } from "../../../components/Dialog";
import { listItemStyles } from "../../../theme";
export interface FoodProviderListItemStyleProps {
	classes: {
		avatar: string;
	};
}
export class FoodProviderListItem extends React.PureComponent<
	FoodProviderProps & RouteComponentProps & WithDispatch & FoodProviderListItemStyleProps
	> {
	deleteConfirmationDialogController: ConfirmationDialogControllerProps = {
		open: () => null,
		close: () => null,
	};
	delete = () => this.props.dispatch(routines.remove.trigger({ data: { _id: this.props._id } }));
	render() {
		const { _id, picture, name, foodTypes, minOrderCost, description, classes } = this.props;
		return (
			<React.Fragment>
				<ListItem>
					<ListItemAvatar>
						<Avatar src={picture} className={classes.avatar} />
					</ListItemAvatar>
					<ListItemText primary={name} secondary={
						<React.Fragment>
							<Typography component="span">
								{foodTypes.map(t => t.name).join(", ")}
							</Typography>
							<Typography component="span">
								Minimum Order Cost: <b>{minOrderCost}</b>
							</Typography>
							<Typography component="span">
								<i>{description}</i>
							</Typography>
						</React.Fragment>
					} />
					<ListItemSecondaryAction>
						<LinkedIconButton aria-label="Edit" to={`/food-providers/${_id}`}>
							<EditIcon />
						</LinkedIconButton>
						<IconButton aria-label="Delete" onClick={() => this.deleteConfirmationDialogController.open()}>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
				<ConfirmationDialog
					controller={this.deleteConfirmationDialogController}
					title={`Please confirm removing ${name}`}
					description={`Are you sure you want remove ${name}? You can not undo this action.`}
					onAgree={this.delete}
				/>
			</React.Fragment>
		);
	}
}

export default connect(null)(
	withRouter(
		withStyles(listItemStyles)(
			FoodProviderListItem,
		),
	),
) as React.ComponentType<FoodProviderProps>;