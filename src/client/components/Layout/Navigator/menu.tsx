import * as React from "react";
import HomeIcon from "@material-ui/icons/Home";
import FastfoodIcon from "@material-ui/icons/Fastfood";
export interface NavigatorMenuItem {
	to: string;
	icon: JSX.Element;
	text: string;
}
export const publicPreRoutes: Array<NavigatorMenuItem> = [
	{
		to: "/",
		icon: <HomeIcon />,
		text: "Home",
	},
];

export const privateRoutes: Array<NavigatorMenuItem> = [
	{
		to: "/food-types",
		icon: <FastfoodIcon />,
		text: "Food Types",
	},
];

export const publicPostRoutes: Array<NavigatorMenuItem> = [

];