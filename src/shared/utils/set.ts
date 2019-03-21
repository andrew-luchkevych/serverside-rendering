import { isArray } from "./types";

export function fixAfterRehydrate<T>(set: any): Set<T> {
	if (set instanceof Set) {
		return new Set(set);
	}
	if (typeof set === "object") {
		if (isArray(set)) {
			return new Set(set);
		}
		const keys = Object.keys(set);
		return new Set(keys.map(key => set[key]));
	}
	return new Set();
}

export function addToSetImmutable<T>(value: T, set: any = new Set()): Set<T> {
	const s = fixAfterRehydrate<T>(set);
	s.add(value);
	return s;
}

export function removeFromSetImmutable<T>(value: T, set: any = new Set()): Set<T> {
	const s = fixAfterRehydrate<T>(set);
	s.delete(value);
	return s;
}