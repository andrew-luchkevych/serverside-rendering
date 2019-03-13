import * as React from "react";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
const items = [
	{
		to: "/",
		icon: <HomeIcon />,
		text: "Home",
	}, {
		to: "/users",
		icon: <PeopleIcon />,
		text: "GitHub Users",
	},
];
export default items;