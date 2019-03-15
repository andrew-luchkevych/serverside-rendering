import * as React from "react";
import { Helmet } from "react-helmet";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import LoginForm from "./form";
import { styles } from "./styles";
import { ApiLoginProps } from "../../../shared/redux/user/api";
export interface LoginStyleProps {
	classes: {
		main: string;
		paper: string;
		avatar: string;
	};
}
export class Login extends React.PureComponent<LoginStyleProps> {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.main}>
				<Helmet>
					<title>Login</title>
				</Helmet>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<LoginForm />
				</Paper>
			</div>

		);
	}
}
export default withStyles(styles)(Login);