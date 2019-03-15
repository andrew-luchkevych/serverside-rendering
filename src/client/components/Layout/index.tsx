import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import { SnackbarProvider, withSnackbar, withSnackbarProps } from "notistack";
import { drawerWidth, styles } from "../../theme";
import { ErrorBoundary } from "../errors/ErrorBoundary";
import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Navigator from "./Navigator";
export interface RootLayoutStyleProps {
	classes: {
		root: string;
		nav: string;
		navHidden: string;
		drawer: string;
		appContent: string;
	};
}
export interface RootLayoutProps extends RootLayoutStyleProps, withSnackbarProps {
	children: React.ReactElement;
	title?: string;
}

export interface RootLayoutState {
	showDrawer: boolean;
}

export class RootLayout extends React.Component<RootLayoutProps, RootLayoutState> {
	state = { showDrawer: false };
	componentDidMount() {

	}
	toggleMenu = () => this.setState(({ showDrawer }) => ({ showDrawer: !showDrawer }));
	render() {
		const { props: { classes, children, title }, state: { showDrawer } } = this;
		return (
			<div className={classes.root}>
				<CssBaseline />
				<nav className={classNames(classes.nav, { [classes.navHidden]: !showDrawer })}>
					<Hidden smUp implementation="js">
						<Navigator
							PaperProps={{ style: { width: drawerWidth } }}
							variant="temporary"
							open={showDrawer}
							onClose={this.toggleMenu}
						/>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Navigator
							PaperProps={{ style: { width: drawerWidth } }}
							open={this.state.showDrawer}
							onClose={this.toggleMenu}
							className={classes.drawer}
							variant="persistent" anchor="left"
						/>
					</Hidden>
				</nav>
				<div id="root-content" className={classes.appContent}>
					<Header onDrawerToggle={this.toggleMenu} />
					<ContentWrapper>
						<SnackbarProvider maxSnack={5}>
							<ErrorBoundary>
								{children}
							</ErrorBoundary>
						</SnackbarProvider>
					</ContentWrapper>
				</div>
			</div>
		);
	}
}
export default withStyles(styles)(withSnackbar(RootLayout));