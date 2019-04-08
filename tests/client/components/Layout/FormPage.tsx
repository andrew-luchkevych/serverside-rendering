import * as React from "react";
import { shallow } from "enzyme";
import { FormPage } from "../../../../src/client/components/Layout/FormPage";
describe("/client/components/layout", () => {
	it("render", () => {
		const title = "fakeTitle";
		const c = shallow(
			<FormPage
				classes={{ main: "main", paper: "paper", avatar: "avatar" }}
				title="fakeTitle"
				icon={<i id="icon"></i>}
				form={<form id="form"></form>}
			/>,
		);
		expect(c.find("title").childAt(0).text()).toBe(title);
		expect(c.find("#icon").length).toBe(1);
		expect(c.find("#form").length).toBe(1);
	});
});