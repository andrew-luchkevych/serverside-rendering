import { Map } from "immutable";
import { AnyObject } from "../types/Basic";
export function fixAfterRehydrate(obj: AnyObject) {
	if (Map.isMap(obj)) {
		return obj;
	}
	const t: any = Object.keys(obj).map(key => [key, obj[key]]);
	return Map(t);
}