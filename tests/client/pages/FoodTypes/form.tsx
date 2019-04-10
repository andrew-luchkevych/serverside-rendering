import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import { ReduxStoreState } from "../../../../src/shared/types/store/RootReducer";
import configureStore from "../../../../src/shared/redux/configureStore";
import { get as getFoodTypes } from "../../../../src/shared/redux/foodTypes/routines";
import { create, edit } from "../../../../src/shared/redux/foodTypes/routines";
import SubmitButton from "../../../../src/client/components/Form/SubmitButton";
import fakeFoodType from "../../../../fakes/foodType";
import FormPage from "../../../../src/client/components/Layout/FormPage";
import CreatePage from "../../../../src/client/pages/FoodTypes/form/create";
import {
	EditFoodTypePage,
	mapStateToProps as editPageStateMapper,
} from "../../../../src/client/pages/FoodTypes/form/edit";
import { FoodTypeForm, FoodTypeFormProps } from "../../../../src/client/pages/FoodTypes/form/form";
describe("/client/client/pages/FoodTypes/form", () => {
	let form: ShallowWrapper<FoodTypeFormProps, {}, FoodTypeForm>;
	let formMockedProps = {
		dispatch: sinon.spy(),
		foodTypes: {
			data: [],
			processing: false,
			loaded: false,
		},
		initialValues: {},
		history: {
			push: sinon.spy(),
		},
		handleSubmit: sinon.spy(),
	};
	it("create page", () => {
		const c = shallow(<CreatePage />);
		expect(c.is(FormPage));
	});

	it("edit page", () => {
		let c = shallow(<EditFoodTypePage />);
		expect(c.is(FormPage));
		c = shallow(<EditFoodTypePage foodType={fakeFoodType} />);
		expect(c.is(FormPage));
	});

	it("should map props correctly", () => {
		const init: Partial<ReduxStoreState> = {
			foodTypes: {
				data: [fakeFoodType],
				loaded: true,
				processing: false,
			},
		};
		const state = configureStore(init).getState();
		const mapped = editPageStateMapper(state, { match: { params: { id: fakeFoodType._id } } } as any);
		expect(mapped.foodType).toEqual(fakeFoodType);
	});
	it("should render creation form", () => {
		form = shallow(<FoodTypeForm {...formMockedProps as any} />);
		expect(form.find(SubmitButton).prop("text")).toBe("Create");
		expect(formMockedProps.dispatch.calledOnceWith(getFoodTypes.trigger()));
	});
	it("should create on submit", (done) => {
		formMockedProps.dispatch.resetHistory();
		formMockedProps.history.push.resetHistory();
		const foodType = {
			name: "fake",
			foodTypes: [],
		};
		form.instance().onSubmit(foodType);
		expect(formMockedProps.dispatch.calledOnce).toBe(true);
		const args = formMockedProps.dispatch.getCall(0).args[0];
		expect(args.type).toBe(create.TRIGGER);
		expect(args.payload.data).toBe(foodType);
		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				expect(formMockedProps.history.push.calledOnceWith("/food-types")).toBe(true);
				done();
			}, 1000);
		}, 1000);
	});

	it("should render edition form", () => {
		(formMockedProps.initialValues as any)._id = "fake";
		form = shallow(<FoodTypeForm {...formMockedProps as any} />);
		expect(form.find(SubmitButton).prop("text")).toBe("Save");
		expect(formMockedProps.dispatch.calledOnceWith(getFoodTypes.trigger()));
	});
	it("should edit on submit", (done) => {
		formMockedProps.dispatch.resetHistory();
		formMockedProps.history.push.resetHistory();
		const foodType = {
			_id: "fake",
			name: "fake",
		};
		form.instance().onSubmit(foodType);
		expect(formMockedProps.dispatch.calledOnce).toBe(true);
		const args = formMockedProps.dispatch.getCall(0).args[0];
		expect(args.type).toBe(edit.TRIGGER);
		expect(args.payload.data).toBe(foodType);
		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				expect(formMockedProps.history.push.calledOnceWith("/food-types")).toBe(true);
				done();
			}, 1000);
		}, 1000);
	});
});