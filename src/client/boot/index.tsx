import * as React from "react";
import StoreProvider from "./store";
import WithPredefinedStore from "../../shared/store/WithPredefinedStore";
export interface BootProps extends WithPredefinedStore { }
export const Boot = (props: BootProps) => (
	<StoreProvider {...props}>
		<div>
			Hello world
		</div>
	</StoreProvider>
);

export default Boot;