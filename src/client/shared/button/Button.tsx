import * as React from 'react';

export interface IButtonProps {
	onClick: () => void;
	primary?: boolean;
	children: any;
}

export const Button: React.StatelessComponent<IButtonProps> = ({ onClick, children }) => (
	<button onClick={onClick}>
		{children}
	</button>
);
