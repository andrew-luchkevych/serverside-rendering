import * as React from "react";

export interface IError404Props {
	staticContext?: any;
}

export default class Error404 extends React.Component<IError404Props, any> {
	constructor(props: IError404Props) {
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
