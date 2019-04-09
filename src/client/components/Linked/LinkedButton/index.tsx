import * as React from "react";
import { Link } from "react-router-dom";
import Button, { ButtonProps } from "@material-ui/core/Button";
const CustomButton: any = Button;

export interface LinkedButtonProps extends ButtonProps {
	to?: string;
	replace?: boolean;
}

const LinkedButton = (props: LinkedButtonProps) => <CustomButton {...props} component={Link} />;

LinkedButton.dispayName = "LinkedButton";
export default LinkedButton;