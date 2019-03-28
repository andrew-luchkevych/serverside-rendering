import * as React from "react";
import { connect } from "react-redux";
import Drawer, { DrawerProps } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import MenuTitle from "./title";
import PrimaryItem from "./primaryItem";
import { publicPreRoutes, privateRoutes, publicPostRoutes, NavigatorMenuItem } from "./menu";
import { isUserLogged } from "../../../../shared/redux/user/selectors";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";

export interface NavigatorOwnProps {
	drawer: DrawerProps;
}
export interface NavigatorConnectedProps {
	logged: boolean;
}
const Navigator = (props: NavigatorOwnProps & NavigatorConnectedProps) => {
	const mapper = (m: NavigatorMenuItem, i: number) => <PrimaryItem {...m} key={i} />;
	const { logged, drawer } = props;
	return (
		<Drawer {...drawer}>
			<List disablePadding>
				<MenuTitle />
				{publicPreRoutes.map(mapper)}
				{logged && privateRoutes.map(mapper) || null}
				{publicPostRoutes.map(mapper)}
			</List>
		</Drawer>
	);
};
const mapStateToProps = (state: ReduxStoreState): NavigatorConnectedProps => ({ logged: isUserLogged(state) });
export default connect(mapStateToProps)(Navigator) as React.ComponentType<NavigatorOwnProps>;