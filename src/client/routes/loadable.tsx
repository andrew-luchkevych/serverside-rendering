import * as React from "react";
import Loadable from "react-loadable";
import Loader from "../components/Loader";
export const Loading = (props: any) => {
	if (props.error) {
		return <div>Error!</div>;
	} else if (props.pastDelay) {
		return <Loader />;
	}
	return null;
};

export const LoadableComponent = (importFunction: () => Promise<any>) => Loadable({
	loading: Loading,
	loader: importFunction,
	delay: 300,
});

export default LoadableComponent;