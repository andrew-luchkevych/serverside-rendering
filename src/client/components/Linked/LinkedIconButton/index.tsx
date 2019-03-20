import * as React from "react";
import { Link } from "react-router-dom";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
const CustomButton: any = IconButton;

export interface LinkedIconButtonProps extends IconButtonProps {
	to?: string;
	replace?: boolean;
}

const LinkedIconButton = (props: LinkedIconButtonProps) => (
	<CustomButton {...props} component={Link} />
);

LinkedIconButton.dispayName = "LinkedIconButton";
export default LinkedIconButton;