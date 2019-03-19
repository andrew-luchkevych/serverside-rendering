import * as React from "react";
import { connect } from "react-redux";
import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuTitle from "./title";
import PrimaryItem from "./primaryItem";
import { publicPreRoutes, privateRoutes, publicPostRoutes, NavigatorMenuItem } from "./menu";
import { loggedSelector } from "../../../../shared/redux/user/selectors";
const Navigator = (props: DrawerProps & { logged: boolean }) => {
	const mapper = (m: NavigatorMenuItem, i: number) => <PrimaryItem {...m} key={i} />;
	const { logged, ...drawerProps } = props;
	return (
		<Drawer {...drawerProps}>
			<List disablePadding>
				<MenuTitle />
				{publicPreRoutes.map(mapper)}
				{logged && privateRoutes.map(mapper) || null}
				{publicPostRoutes.map(mapper)}
			</List>
		</Drawer>
	);
};
export default connect(loggedSelector)(Navigator) as React.ComponentType<DrawerProps>;