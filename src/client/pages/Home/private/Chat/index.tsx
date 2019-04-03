import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { layout } from "../../../../theme";
import Padder from "../../../../components/Layout/Padder";
import MessagesList from "./messages/index";
import MessagesFooter from "./footer/index";
export interface ChatContainerStylesProps {
	classes: {
		fullheight: string;
		flexColumn: string;
		flexOne: string;
		flexRow: string;
		fullHeightHiddenOverflow: string;
	};
}
export class Chat extends React.PureComponent<ChatContainerStylesProps> {
	render() {
		const { classes } = this.props;
		return (
			<Padder className={classNames(classes.fullHeightHiddenOverflow, classes.flexColumn)}>
				<Typography variant="h4" align="center" gutterBottom>
					Chat
				</Typography>
				<Card className={classNames(classes.flexRow, classes.flexOne)}>
					<CardContent className={classNames(classes.flexColumn, classes.flexOne)} style={{ paddingBottom: 0 }}>
						<MessagesList />
						<MessagesFooter />
					</CardContent>
				</Card>
			</Padder>
		);
	};
}

export default withStyles(layout)(Chat);