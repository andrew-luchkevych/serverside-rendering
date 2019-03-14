import * as React from "react";
import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuTitle from "./title";
import PrimaryItem from "./primaryItem";
import menuItems from "./menu";
const Navigator = (props: DrawerProps) => {
	return (
		<Drawer {...props}>
			<List disablePadding>
				<MenuTitle />
				{
					menuItems.map((m, i) => <PrimaryItem {...m} key={i} />)
				}
			</List>
		</Drawer>
	);
};
export default Navigator;