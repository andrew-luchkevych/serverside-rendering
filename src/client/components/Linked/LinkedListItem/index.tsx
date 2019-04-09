import * as React from "react";
import { Link } from "react-router-dom";
import ListItem, { ListItemProps } from "@material-ui/core/ListItem";

export interface LinkedListItemProps extends ListItemProps {
	to?: string;
	replace?: boolean;
}

const LinkedListItem = (props: LinkedListItemProps) => <ListItem {...props} component={Link} />;

LinkedListItem.dispayName = "LinkedListItem";
export default LinkedListItem;