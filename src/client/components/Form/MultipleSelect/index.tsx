import * as React from "react";
import { WrappedFieldMetaProps, WrappedFieldInputProps } from "redux-form";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import FormHelperText from "@material-ui/core/FormHelperText";
import { styles } from "./styles";

export interface FormSelectFieldOption {
	_id: string;
	name: string;
}
export interface FormSelectStyleProps {
	classes: {
		chips: string;
		chip: string;
	};
}
export interface FormSelectProps {
	input: WrappedFieldInputProps;
	label: string;
	meta: WrappedFieldMetaProps;
	options: Array<FormSelectFieldOption>;
}

export class FormSelectField extends React.PureComponent<FormSelectProps & FormSelectStyleProps> {
	ITEM_HEIGHT = 48;
	ITEM_PADDING_TOP = 8;
	MenuProps = {
		PaperProps: {
			style: {
				maxHeight: this.ITEM_HEIGHT * 4.5 + this.ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};
	renderValue = (value: string) => {
		const option = this.props.options.find(option => option._id === value);
		return option
			? <Chip key={option._id} label={option.name} className={this.props.classes.chip} />
			: null;
	}
	renderValues = (selected: Array<string>) => (
		<div className={this.props.classes.chips}>
			{selected.map(this.renderValue)}
		</div>
	)
	renderOption = (option: FormSelectFieldOption) => (
		<MenuItem key={option._id} value={option._id}>
			<Checkbox checked={this.props.input.value.indexOf(option._id) !== -1} />
			<ListItemText primary={option.name} />
		</MenuItem>
	)
	renderOptions = () => this.props.options.map(this.renderOption);
	render() {
		const { input, label, meta: { touched, error } } = this.props;
		return (
			<FormControl error={touched && !!error} fullWidth>
				<InputLabel>{label}</InputLabel>
				<Select
					multiple
					value={input.value || []}
					onChange={input.onChange}
					input={<Input />}
					renderValue={this.renderValues}
					MenuProps={this.MenuProps}
				>
					{this.renderOptions()}
				</Select>
				<FormHelperText>{touched && error || null}</FormHelperText>
			</FormControl>
		);
	}
}

export default withStyles(styles)(FormSelectField);