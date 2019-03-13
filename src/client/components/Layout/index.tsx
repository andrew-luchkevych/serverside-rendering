import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import { drawerWidth, styles } from "../../theme";
import { ErrorBoundary } from "../errors/ErrorBoundary";
import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Navigator from "./Navigator";
export interface RootLayoutStyleProps {
	classes: {
		root: string,
		drawer: string,
		appContent: string,
	};
}
export interface RootLayoutProps extends RootLayoutStyleProps {
	children: React.ReactElement;
	title?: string;
}

export interface RootLayoutState {
	showMenu: boolean;
}

export class RootLayout extends React.Component<RootLayoutProps, RootLayoutState> {
	state = { showMenu: false };
	toggleMenu = () => this.setState(({ showMenu }) => ({ showMenu: !showMenu }));
	render() {
		const { classes, children, title } = this.props;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<nav className={classes.drawer}>
					<Hidden smUp implementation="js">
						<Navigator
							PaperProps={{ style: { width: drawerWidth } }}
							open={this.state.showMenu}
							onClose={this.toggleMenu}
							variant="temporary"
						/>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Navigator PaperProps={{ style: { width: drawerWidth } }} />
					</Hidden>
				</nav>
				<div id="root-content" className={classes.appContent}>
					<Header onDrawerToggle={this.toggleMenu} />
					<ContentWrapper>
						<ErrorBoundary>
							{children}
						</ErrorBoundary>
					</ContentWrapper>
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(RootLayout);