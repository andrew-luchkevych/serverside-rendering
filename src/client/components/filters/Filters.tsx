import * as React from 'react';

export interface IFiltersProps {
	list: any[];
}

export class Filters extends React.Component<IFiltersProps, any> {
	render() {
		return (
			<>
				{this.props.list.map((filter: any) => (
					<div key={filter.id}>
						{filter.title}
					</div>
				))}
			</>
		);
	}
}
