import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import FormPage from "../../../../src/client/components/Layout/FormPage";
import { SignUpForm, SignUpFormProps } from "../../../../src/client/pages/SignUp/form";
import SignUp from "../../../../src/client/pages/SignUp";
import { ApiSignUpProps } from "../../../../src/shared/redux/user/api";
import { signup } from "../../../../src/shared/redux/user/routines";
describe("/client/pages/SignUp", () => {
	let form: ShallowWrapper<SignUpFormProps, {}, SignUpForm>;
	let formInst: SignUpForm;
	let formMockedProps: any = {
		dispatch: sinon.spy(),
		formValues: {
			password: "fake",
		},
		history: {
			replace: sinon.spy(),
		},
		handleSubmit: sinon.spy(),
	};
	const d = formMockedProps.dispatch as sinon.SinonSpy;
	const hr = formMockedProps.history.replace as sinon.SinonSpy;
	const hs = formMockedProps.handleSubmit as sinon.SinonSpy;
	const data: ApiSignUpProps = {
		email: "fake@fake.com",
		password: "fake",
		profile: {
			name: "fake",
		},
	};
	afterEach(() => {
		d.resetHistory();
		hr.resetHistory();
		hs.resetHistory();
	});
	it("create page", () => {
		const c = shallow(<SignUp />);
		expect(c.is(FormPage));
	});
	it("onSubmit", (done) => {
		form = shallow(<SignUpForm {...formMockedProps} />);
		formInst = form.instance();

		formInst.onSubmit(data);
		expect(d.calledOnce).toBe(true);

		const args = formMockedProps.dispatch.getCall(0).args[0];
		expect(args.type).toBe(signup.TRIGGER);
		expect(args.payload.data).toBe(data);

		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				expect(hr.calledOnceWith("/")).toBe(true);
				done();
			}, 1000);
		}, 1000);
	});
});