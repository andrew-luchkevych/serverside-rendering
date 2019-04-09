import * as React from "react";

export interface Error404Props {
	staticContext?: any;
}

export default class Error404 extends React.Component<Error404Props> {
	constructor(props: Error404Props) {
		super(props);
		const { staticContext }: any = props;
		if (staticContext) {
			staticContext.status = 404;
		}
	}

	render() {
		return <h1>Sorry, can’t find that. 404.</h1>;
	}
}
