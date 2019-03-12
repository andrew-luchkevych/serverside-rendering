import * as React from 'react';

const date = () => {
	return new Date().getFullYear();
};

export const Footer = () => (
	<div id="footer">
		&copy; {date()}
	</div>
);
