import { Theme } from "@material-ui/core";
import { AnyObject } from "../../shared/types/Basic";
export const combineStyles =
	(...styles: Array<AnyObject | Function>) =>
		(theme: Theme) =>
			styles
				.map(
					arg => typeof arg === "function"
						? arg(theme)
						: arg,
				)
				.reduce((acc, val) => Object.assign(acc, val));