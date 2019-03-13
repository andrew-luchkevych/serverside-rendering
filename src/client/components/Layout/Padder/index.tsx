import * as React from "react";

export interface PadderProps {
	children?: React.ReactNode;
}
export const Padder = (props: PadderProps) => (
	<div style={{ padding: 20 }}>
		{props.children}
	</div>
);

export default Padder;