const required = (value: string) => (value ? undefined : "Required");
const maxLength = (max: number) => (value: string) => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength30 = maxLength(30);
const maxLength100 = maxLength(100);
const maxLength128 = maxLength(128);
const minLength = (min: number) => (value: string) => (value && value.length < min ? `Must be ${min} characters or more` : undefined);
const minLength1 = minLength(1);
const minLength2 = minLength(2);
const minLength5 = minLength(5);
const minLength8 = minLength(8);
const email = (value: string) => {
	const m = "Invalid email address";
	if (value) {
		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) || value.length > 254) {
			return m;
		}
	} else {
		return m;
	}
};
const numeric = (value: string) => (value && /[^0-9]/i.test(value) ? "Only numbers allowed" : undefined);
const alphaNumeric = (value: string) => (value && /[^a-zA-Z0-9 ]/i.test(value) ? "Only alphanumeric characters" : undefined);
const letters = (value: string) => (value && /[^a-zA-Z ]/i.test(value) ? "Only letters allowed" : undefined);
const match = (matchValue: string, message: string) => (value: string) => matchValue === value ? undefined : message;
export default {
	required,
	maxLength,
	maxLength30,
	maxLength100,
	maxLength128,
	minLength,
	minLength1,
	minLength2,
	minLength5,
	minLength8,
	email,
	numeric,
	alphaNumeric,
	letters,
	match,
};
