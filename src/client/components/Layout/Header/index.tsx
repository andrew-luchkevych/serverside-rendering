import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from "./styles";

export interface HeaderStylesProps {
	classes: {
		menuButton: string;
		link: string;
		iconButtonAvatar: string;
		avatar: string;
		secondaryBar: string;
		button: string;
	}
}
export interface HeaderProps extends HeaderStylesProps {
	onDrawerToggle: () => void;
}

function Header(props: HeaderProps) {
	const { classes, onDrawerToggle } = props;
	return (
		<AppBar color="primary" position="sticky" elevation={0} style={{ minWidth: 320 }}>
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
							Authentication
              				</Typography>
					</Grid>
					<Grid item>
						<Tooltip title="Alerts • No alters">
							<IconButton color="inherit">
								<NotificationsIcon />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid item>
						<IconButton color="inherit" className={classes.iconButtonAvatar}>
							<Avatar className={classes.avatar} src="/static/images/avatar/1.jpg" />
						</IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default withStyles(styles)(Header);