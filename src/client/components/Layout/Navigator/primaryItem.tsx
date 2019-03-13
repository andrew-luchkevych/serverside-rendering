import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import LinkedListItem from "../../../components/LinkedListItem";
import { itemStyles } from "./styles";
export interface PrimaryItemProps {
	classes: {
		item: string;
		itemCategory: string;
		itemPrimary: string;
	};
	to?: string;
	icon: any;
	text: string;
}
export const PrimaryItem = (props: PrimaryItemProps) => {
	const { classes, to, icon, text } = props;
	return (
		<LinkedListItem button to={to || "#"} className={classNames(classes.item, classes.itemCategory)}>
			<ListItemIcon>
				{icon}
			</ListItemIcon>
			<ListItemText
				classes={{
					primary: classes.itemPrimary,
				}}
			>
				{text}
			</ListItemText>
		</LinkedListItem>
	);
};

export const StyledPrimaryItem = withStyles(itemStyles)(PrimaryItem);
StyledPrimaryItem.displayName = "StyledPrimaryItem";
export default StyledPrimaryItem;