import { RouteProps } from "react-router";

export interface AppRouteProps extends RouteProps {
	status?: number;
	isPrivate?: boolean;
}