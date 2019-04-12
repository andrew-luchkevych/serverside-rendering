import formValuesSelector from "../../../src/client/services/formValuesSelector";
import configureStore from "../../../src/shared/redux/configureStore";
import { ReduxStoreState } from "../../../src/shared/types/store/RootReducer";
describe("/client/services/formValueSelector", () => {
	it("formValuesSelector", () => {
		const formName = "fakeForm";
		const fieldName = "fakeField";
		const fieldValue = "fake";
		let state = configureStore({}, true).getState();
		expect(formValuesSelector(state, formName, [fieldName])[fieldName]).toBe(null);

		let initValues: Partial<ReduxStoreState> = {
			form: {
				[formName]: <any>{

				},
			},
		};

		state = configureStore(initValues, true).getState();
		expect(formValuesSelector(state, formName, [fieldName])[fieldName]).toBe(null);

		initValues.form[formName].values = { [fieldName]: fieldValue };
		state = configureStore(initValues, true).getState();
		expect(formValuesSelector(state, formName, [fieldName])[fieldName]).toBe(fieldValue);
	});
});