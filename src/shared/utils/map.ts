import { Map, OrderedMap } from "immutable";
import { AnyObject } from "../types/Basic";
export function fixAfterRehydrateMap(obj: AnyObject) {
	if (Map.isMap(obj)) {
		return obj;
	}
	const t: any = Object.keys(obj).map(key => [key, obj[key]]);
	return Map(t);
}

export function fixAfterRehydrateOrderedMap(obj: AnyObject) {
	if (OrderedMap.isOrderedMap(obj)) {
		return obj;
	}
	const t: any = Object.keys(obj).map(key => [key, obj[key]]);
	return OrderedMap(t);
}