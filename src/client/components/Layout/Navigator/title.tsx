import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import { titleStyles } from "./styles";
export interface MenuTitleProps {
	classes: {
		firebase: string;
		item: string;
		itemCategory: string;
	};
}

export const MenuTitle = (props: MenuTitleProps) => {
	const { classes } = props;
	return (
		<ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
			Food Dicer
		</ListItem>
	);
};
export default withStyles(titleStyles)(MenuTitle);