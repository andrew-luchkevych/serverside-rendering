import { createMuiTheme } from "@material-ui/core/styles";
import { CSSProperties } from "@material-ui/core/styles/withStyles";
export const drawerWidth = 256;
const drawerBg = "#18202c";
const sharedTheme = createMuiTheme({
	typography: {
		useNextVariants: true,
		h5: {
			fontWeight: 500,
			fontSize: 26,
			letterSpacing: 0.5,
		},
	},
	palette: {
		primary: {
			light: "#63ccff",
			main: "#009be5",
			dark: "#006db3",
		},
	},
	shape: {
		borderRadius: 8,
	},
});

export const theme = createMuiTheme({
	...sharedTheme,
	overrides: {
		MuiDrawer: {
			paper: {
				backgroundColor: drawerBg,
			},
		},
		MuiButton: {
			label: {
				textTransform: "initial",
			},
			contained: {
				boxShadow: "none",
				"&:active": {
					boxShadow: "none",
				},
			},
		},
		MuiTabs: {
			root: {
				marginLeft: sharedTheme.spacing.unit,
			},
			indicator: {
				height: 3,
				borderTopLeftRadius: 3,
				borderTopRightRadius: 3,
				backgroundColor: sharedTheme.palette.common.white,
			},
		},
		MuiTab: {
			root: {
				textTransform: "initial",
				margin: "0 16px",
				minWidth: 0,
				[sharedTheme.breakpoints.up("md")]: {
					minWidth: 0,
				},
			},
			labelContainer: {
				padding: 0,
				[sharedTheme.breakpoints.up("md")]: {
					padding: 0,
				},
			},
		},
		MuiIconButton: {
			root: {
				padding: sharedTheme.spacing.unit,
			},
		},
		MuiTooltip: {
			tooltip: {
				borderRadius: 4,
			},
		},
		MuiDivider: {
			root: {
				backgroundColor: "#404854",
			},
		},
		MuiListItemText: {
			primary: {
				fontWeight: sharedTheme.typography.fontWeightMedium,
			},
		},
		MuiListItemIcon: {
			root: {
				color: "inherit",
				marginRight: 0,
				"& svg": {
					fontSize: 20,
				},
			},
		},
		MuiAvatar: {
			root: {
				width: 32,
				height: 32,
			},
		},
	},
	props: {
		MuiTab: {
			disableRipple: true,
		},
	},
	mixins: {
		...sharedTheme.mixins,
		toolbar: {
			minHeight: 48,
		},
	},
});

export const styles = {
	root: <CSSProperties>{
		display: "flex",
		minHeight: "100vh",
	},
	nav: <CSSProperties>{
		width: drawerWidth,
		overflowX: "hidden",
		backgroundColor: drawerBg,
		flexShrink: 0,
		// transition: theme.transitions.create(["width"], {
		// 	easing: theme.transitions.easing.sharp,
		// 	duration: theme.transitions.duration.leavingScreen,
		// }),
	},
	navHidden: <CSSProperties>{
		width: 0,
	},
	drawer: <CSSProperties>{
		width: drawerWidth,
	},
	appContent: <CSSProperties>{
		flex: 1,
		display: "flex",
		flexDirection: "column",
	},
	mainContent: <CSSProperties>{
		flex: 1,
		padding: "48px 36px 0",
		background: "#eaeff1",
	},
};
export default theme;