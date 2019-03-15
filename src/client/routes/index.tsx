import { AppRouteProps } from "../types/RouteProps";
import LoadableComponent from "./loadable";
const Error404 = LoadableComponent(() => import("../components/errors/Error404"));
const Home = LoadableComponent(() => import("../pages/Home"));
const Login = LoadableComponent(() => import("../pages/Login"));

const routes: Array<AppRouteProps> = [
	{
		path: "/",
		exact: true,
		component: Home,
	},
	{
		path: "/login",
		exact: true,
		component: Login,
	},
	{
		path: "*",
		component: Error404,
		status: 404,
	},
];

export default routes;
