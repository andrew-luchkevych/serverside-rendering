import * as React from "react";
import { Helmet } from "react-helmet";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { styles } from "./styles";
export interface FormPageStyleProps {
	classes: {
		main: string;
		paper: string;
		avatar: string;
	};
}

export interface FormPageOwnProps {
	title: string;
	icon?: React.ReactNode;
	form: React.ReactNode;
}
export class FormPage extends React.PureComponent<FormPageStyleProps & FormPageOwnProps> {
	render() {
		const { classes, title, icon, form } = this.props;
		return (
			<div className={classes.main}>
				<Helmet>
					<title>{title}</title>
				</Helmet>
				<Paper className={classes.paper}>
					<Avatar className={classes.avatar}>
						{icon}
					</Avatar>
					<Typography component="h1" variant="h5" gutterBottom>
						{title}
					</Typography>
					{form}
				</Paper>
			</div>

		);
	}
}
export default withStyles(styles)(FormPage);