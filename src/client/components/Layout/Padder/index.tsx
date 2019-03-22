import * as React from "react";

export interface PadderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	children?: React.ReactNode;
	padding?: number;
}
export const Padder = (props: PadderProps) => {
	const { padding, children, style, ...rest } = props;
	const mergedStyle = {
		padding: padding || 20,
		...style,
	};
	return (
		<div style={mergedStyle} {...rest}>
			{props.children}
		</div>
	);
};

export default Padder;