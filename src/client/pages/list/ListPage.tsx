import * as React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { IInitialState } from "../../redux/filters/reducer";
import { ErrorBoundary } from "../../components/errors/ErrorBoundary";
import { Filters } from "../../components/filters/Filters";

interface IListProps {
	filters: IInitialState;
}

interface IListState {
	fetchData: any;
}

export class ListPage extends React.Component<IListProps, IListState> {
	constructor(props: IListProps) {
		super(props);
	}

	render() {
		const { filters } = this.props;

		if (!filters || filters.list.length === 0) {
			return <h1>List page</h1>;
		}

		return (
			<>
				<Helmet>
					<title></title>
					<meta name="description" content="objects, stuff, others" />
				</Helmet>
				<h1>Home page</h1>
				<ErrorBoundary>
					<Filters list={this.props.filters.list} />
				</ErrorBoundary>
			</>
		);
	}
}

const mapStateToProps = (state: any) => ({ filters: state.filters });

export default connect(mapStateToProps)(ListPage);
