import * as React from "react";
import Boot from "./boot";
import { WithPredefinedStore } from "../shared/store/WithPredefinedStore";
export interface AppProps extends WithPredefinedStore { }
const App = (props: AppProps) => (
	<Boot {...props} />
);
export default App;
