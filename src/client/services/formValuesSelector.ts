import { ReduxStoreState } from "../../shared/types/store/RootReducer";

export function formValuesSelector<T>(state: ReduxStoreState, formName: string, fieldNames: Array<string>): T {
	const r = {};
	fieldNames.forEach((key) => r[key] = null);
	if (!state.form.hasOwnProperty(formName)) {
		return r as T;
	}
	const form = state.form[formName];
	if (!form.hasOwnProperty("values")) {
		return r as T;
	}
	const { values } = form;
	fieldNames.forEach((key) => {
		if (values.hasOwnProperty(key)) {
			r[key] = values[key];
		}
	});
	return r as T;
}

export default formValuesSelector;