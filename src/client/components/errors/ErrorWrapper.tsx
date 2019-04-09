import * as React from "react";
import { ErrorBoundaryState } from "./ErrorBoundary";

export const withError = (WrappedComponent: React.ComponentType) => {
	return class ErrorBoundary extends React.Component<typeof WrappedComponent, ErrorBoundaryState> {
		state = { error: null, errorInfo: null };
		componentDidCatch(error: any, errorInfo: React.ErrorInfo) {
			this.setState({
				error,
				errorInfo,
			});
		}

		render() {
			if (this.state.errorInfo) {
				return (
					<div>
						<h2>Something went wrong.</h2>
						<details style={{ whiteSpace: "pre-wrap" }}>
							{this.state.error && this.state.error.toString()}
							<br />
							{this.state.errorInfo.componentStack}
						</details>
					</div>
				);
			}
			return <WrappedComponent {...this.props} />;
		}
	};
};

export default withError;