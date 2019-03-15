import * as React from "react";
import Loadable from "react-loadable";
import Loader from "../components/Loader";
const Loading = (props: any) => {
	let comp: any = null;
	if (props.error) {
		comp = <div>Error!</div>;
	} else if (props.pastDelay) {
		comp = <Loader />;
	}

	return comp;
};

const LoadableComponent = (importFunction: () => Promise<any>) => Loadable({
	loading: Loading,
	loader: importFunction,
	delay: 300,
});

export default LoadableComponent;