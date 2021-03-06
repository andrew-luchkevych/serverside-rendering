import * as React from "react";
import Helmet from "react-helmet";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import WithDispatch from "../../../../shared/types/store/dispatch";
import { logout } from "../../../../shared/redux/user/routines";
import UserProps from "../../../../shared/types/User";
import { ReduxStoreState } from "../../../../shared/types/store/RootReducer";
import { isUserLogged, getUserData } from "../../../../shared/redux/user/selectors";
import LinkedButton from "../../Linked/LinkedButton/index";
import styles from "./styles";
export interface HeaderStylesProps {
	classes: {
		menuButton: string;
		link: string;
		iconButtonAvatar: string;
		avatar: string;
		secondaryBar: string;
		button: string;
	};
}
export interface HeaderConnectedProps {
	logged: boolean;
	user?: UserProps;
}
export interface HeaderOwnProps {
	onDrawerToggle: () => void;
}
export interface HeaderState {
	title: string;
	userMenuOpen: boolean;
}

export type HeaderProps = HeaderOwnProps & HeaderConnectedProps & WithDispatch & HeaderStylesProps;

export class Header extends React.PureComponent<HeaderProps, HeaderState> {
	userMenuAnchor: any;
	state = { title: "Serverside Rendering", userMenuOpen: false };
	updateTitle = ({ title }) => this.setState({ title });
	handleMenuToggle = () => {
		this.setState(({ userMenuOpen }) => ({ userMenuOpen: !userMenuOpen }));
	}
	handleMenuClose = () => {
		this.setState({ userMenuOpen: false });
	}
	logout = () => {
		this.handleMenuClose();
		this.props.dispatch(logout.trigger());
	}
	render() {
		const { classes, onDrawerToggle, logged, user } = this.props;
		return (
			<AppBar color="primary" position="sticky" elevation={0} style={{ minWidth: 320 }}>
				<Helmet onChangeClientState={this.updateTitle} />
				<Toolbar>
					<Grid container spacing={8} alignItems="center">
						<Grid item>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={onDrawerToggle}
								className={classes.menuButton}
							>
								<MenuIcon />
							</IconButton>
						</Grid>
						<Grid item xs>
							<Typography color="inherit" variant="h6">
								{this.state.title}
							</Typography>
						</Grid>
						{
							logged && user && (
								<React.Fragment>
									<Grid item>
										<Tooltip title="Alerts • No alters">
											<IconButton color="inherit">
												<NotificationsIcon />
											</IconButton>
										</Tooltip>
									</Grid>
									<Grid item>
										<IconButton
											color="inherit"
											className={classes.iconButtonAvatar}
											buttonRef={ref => this.userMenuAnchor = ref}
											onClick={this.handleMenuToggle}
										>
											<Avatar className={classes.avatar} src={user.profile.picture} />
										</IconButton>
										<Popper open={this.state.userMenuOpen} anchorEl={this.userMenuAnchor} transition disablePortal>
											{({ TransitionProps, placement }) => (
												<Grow
													{...TransitionProps}
													style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
												>
													<Paper>
														<ClickAwayListener onClickAway={this.handleMenuClose}>
															<MenuList>
																<MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
																<MenuItem onClick={this.logout}>Logout</MenuItem>
															</MenuList>
														</ClickAwayListener>
													</Paper>
												</Grow>
											)}
										</Popper>
									</Grid>
								</React.Fragment>
							) || (
								<Grid item>
									<LinkedButton to="/signin" color="inherit">
										Login
									</LinkedButton>
								</Grid>
							)
						}
					</Grid>
				</Toolbar>
			</AppBar>
		);
	}
}

const mapStateToProps = (state: ReduxStoreState): HeaderConnectedProps => ({
	logged: isUserLogged(state),
	user: getUserData(state),
});
export default connect<HeaderConnectedProps, WithDispatch, HeaderOwnProps>(mapStateToProps)(
	withStyles(styles)(Header),
) as React.ComponentType<HeaderOwnProps>;