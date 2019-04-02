import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { styles } from "./styles";

export interface MessagesListStyleProps {
	classes: {
		messagesListWrapper: string;
		list: string;
	};
}
export class MessagesList extends React.PureComponent<MessagesListStyleProps> {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.messagesListWrapper}>
				<List dense>
					{
						Array.from(Array(10).keys()).map(k => (
							<ListItem key={k}>
								<ListItemAvatar>
									<Avatar />
								</ListItemAvatar>
								<ListItemText primary={`Some text ${k}`} />
							</ListItem>
						))
					}
				</List>
			</div>
		);
	}
}

export default withStyles(styles)(MessagesList);