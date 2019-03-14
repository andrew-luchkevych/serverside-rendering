import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./styles";
import Helmet from "react-helmet";
import { userState } from "../../../../shared/redux/user/selectors";
import { UserState } from "../../../../shared/redux/user";

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

export interface HeaderProps extends HeaderStylesProps {
	onDrawerToggle: () => void;
}
export interface HeaderState {
	title: string;
}
export class Header extends React.PureComponent<HeaderProps & UserState, HeaderState> {
	state = { title: "Serverside Rendering" };
	updateTitle = ({ title }) => this.setState({ title });
	render() {
		const { classes, onDrawerToggle } = this.props;
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
						<React.Fragment>
							<Grid item>
								<Tooltip title="Alerts • No alters">
									<IconButton color="inherit">
										<NotificationsIcon />
									</IconButton>
								</Tooltip>
							</Grid>
							<Grid item>
								<IconButton color="inherit" className={classes.iconButtonAvatar}>
									<Avatar className={classes.avatar} src={this.props.data.profile.picture} />
								</IconButton>
							</Grid>
						</React.Fragment>
					</Grid>
				</Toolbar>
			</AppBar>
		);
	}
}

const StyledHeader = withStyles(styles)(Header);
export default connect(userState)(StyledHeader);