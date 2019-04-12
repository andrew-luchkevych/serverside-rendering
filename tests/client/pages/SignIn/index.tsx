import * as React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import sinon from "sinon";
import FormPage from "../../../../src/client/components/Layout/FormPage";
import { LoginForm, LoginFormProps } from "../../../../src/client/pages/SignIn/form";
import Login from "../../../../src/client/pages/SignIn";
import { login } from "../../../../src/shared/redux/user/routines";
describe("/client/pages/SignIn", () => {
	let form: ShallowWrapper<LoginFormProps, {}, LoginForm>;
	let formInst: LoginForm;
	let formMockedProps: any = {
		dispatch: sinon.spy(),
		location: {
			state: undefined,
		},
		history: {
			replace: sinon.spy(),
		},
		handleSubmit: sinon.spy(),
	};
	const d = formMockedProps.dispatch as sinon.SinonSpy;
	const hr = formMockedProps.history.replace as sinon.SinonSpy;
	const hs = formMockedProps.handleSubmit as sinon.SinonSpy;
	const data = {
		email: "fake@fake.com",
		password: "fake",
	};
	afterEach(() => {
		d.resetHistory();
		hr.resetHistory();
		hs.resetHistory();
	});
	it("create page", () => {
		const c = shallow(<Login />);
		expect(c.is(FormPage));
	});
	it("onSubmit", (done) => {
		form = shallow(<LoginForm {...formMockedProps} />);
		formInst = form.instance();

		formInst.onSubmit(data);
		expect(d.calledOnce).toBe(true);

		const args = formMockedProps.dispatch.getCall(0).args[0];
		expect(args.type).toBe(login.TRIGGER);
		expect(args.payload.data).toBe(data);

		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				expect(hr.calledOnceWith("/")).toBe(true);
				done();
			}, 1000);
		}, 1000);
	});

	it("onSubmit (from is set)", (done) => {
		const from = "/fake";
		formMockedProps.location.state = {
			from,
		};
		form.setProps(formMockedProps);

		formInst.onSubmit(data);
		expect(d.calledOnce).toBe(true);

		const args = formMockedProps.dispatch.getCall(0).args[0];
		expect(args.type).toBe(login.TRIGGER);
		expect(args.payload.data).toBe(data);

		setTimeout(() => {
			args.payload.controller.success();
			setTimeout(() => {
				expect(hr.calledOnceWith(from)).toBe(true);
				done();
			}, 1000);
		}, 1000);
	});
});