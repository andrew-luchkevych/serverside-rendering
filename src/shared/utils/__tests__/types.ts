import { isFunction, isArray, isObject } from "../types";

describe("types utils", () => {
	it("isFunction", () => {
		expect(isFunction(undefined)).toBe(false);
		expect(isFunction({})).toBe(false);
		expect(isFunction([])).toBe(false);
		expect(isFunction("")).toBe(false);
		expect(isFunction("a")).toBe(false);
		expect(isFunction(() => { return undefined; })).toBe(true);
	});
	it("isArray", () => {
		expect(isArray(undefined)).toBe(false);
		expect(isArray({})).toBe(false);
		expect(isArray("")).toBe(false);
		expect(isArray("a")).toBe(false);
		expect(isArray(() => { return undefined; })).toBe(false);
		expect(isArray([])).toBe(true);
	});
	it("isObject", () => {
		expect(isObject(undefined)).toBe(false);
		expect(isObject("")).toBe(false);
		expect(isObject("a")).toBe(false);
		expect(isObject(() => { return undefined; })).toBe(false);
		expect(isObject([])).toBe(false);
		expect(isObject({})).toBe(true);
	});
});