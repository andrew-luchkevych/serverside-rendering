import * as React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Hidden from "@material-ui/core/Hidden";
import { withSnackbar, withSnackbarProps } from "notistack";
import { drawerWidth, styles } from "../../theme";
import { ErrorBoundary } from "../errors/ErrorBoundary";
import ContentWrapper from "./ContentWrapper";
import Header from "./Header";
import Navigator from "./Navigator";
import SnackService from "../../../shared/services/SnackService";
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
		const { enqueueSnackbar } = this.props;
		SnackService.install(enqueueSnackbar);
	}
	componentWillUnmount() {
		SnackService.uninstall();
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
							drawer={{
								PaperProps: { style: { width: drawerWidth } },
								variant: "temporary",
								open: showDrawer,
								onClose: this.toggleMenu,
							}}
						/>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Navigator
							drawer={{
								PaperProps: { style: { width: drawerWidth } },
								open: this.state.showDrawer,
								onClose: this.toggleMenu,
								className: classes.drawer,
								variant: "persistent",
								anchor: "left",
							}}
						/>
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
export default withSnackbar(withStyles(styles)(RootLayout));