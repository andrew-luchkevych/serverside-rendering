import { AppRouteProps } from "../types/RouteProps";
import LoadableComponent from "./loadable";
const Error404 = LoadableComponent(() => import("../components/errors/Error404"));
const Home = LoadableComponent(() => import("../pages/Home"));
const SignIn = LoadableComponent(() => import("../pages/SignIn"));
const SignUp = LoadableComponent(() => import("../pages/SignUp"));
const FoodTypes = LoadableComponent(() => import("../pages/FoodTypes"));
const routes: Array<AppRouteProps> = [
	{
		path: "/",
		exact: true,
		component: Home,
	},
	{
		path: "/signin",
		exact: true,
		component: SignIn,
	},
	{
		path: "/signup",
		exact: true,
		component: SignUp,
	},
	{
		path: "/food-types",
		exact: true,
		component: FoodTypes,
		isPrivate: true,
	},
	{
		path: "*",
		component: Error404,
		status: 404,
	},
];

export default routes;
