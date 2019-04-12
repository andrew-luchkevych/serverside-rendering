import v from "../../../src/client/services/validator";

describe("/client/services/validator", () => {
	it("required", () => {
		expect(v.required("")).toBeTruthy();
		expect(v.required("s")).toBeUndefined();
	});

	it("maxLength", () => {
		expect(v.maxLength(2)("qwe")).toBeTruthy();
		expect(v.maxLength(2)("qw")).toBeUndefined();
	});

	it("maxLength", () => {
		expect(v.minLength(4)("qwe")).toBeTruthy();
		expect(v.minLength(1)("qw")).toBeUndefined();
	});

	it("email", () => {
		expect(v.email("")).toBeTruthy();
		expect(v.email("test")).toBeTruthy();

		expect(v.email("test@test.com")).toBeUndefined();
	});

	it("numeric", () => {
		expect(v.numeric("123")).toBeUndefined();
		expect(v.numeric("qwer")).toBeTruthy();
	});

	it("aplhaNumeric", () => {
		expect(v.alphaNumeric("123")).toBeUndefined();
		expect(v.alphaNumeric("qwer")).toBeUndefined();
		expect(v.alphaNumeric("qwer123")).toBeUndefined();
		expect(v.alphaNumeric("!")).toBeTruthy();
	});
	it("letters", () => {
		expect(v.letters("123")).toBeTruthy();
		expect(v.letters("qwer")).toBeUndefined();
	});
	it("match", () => {
		expect(v.match("q", "qwer")("a")).toBe("qwer");
		expect(v.match("a", "m")("a")).toBeUndefined();
	});
});