import * as React from "react";
import { shallow } from "enzyme";
import configureStore from "../../../../src/shared/redux/configureStore";
import PrivateHome from "../../../../src/client/pages/Home/private";
import PublicHome from "../../../../src/client/pages/Home/public";
import { Home, mapStateToProps } from "../../../../src/client/pages/Home";
import PaperWrapper from "../../../../src/client/components/Layout/PaperWrapper";
describe("/client/pages/Home", () => {
	it("should render private home if user logged in", () => {
		const c = shallow(<Home logged={true} />);
		expect(c.is(PrivateHome)).toBe(true);
	});

	it("should render public home if user not logged in", () => {
		const c = shallow(<Home logged={false} />);
		expect(c.is(PublicHome)).toBe(true);
	});

	it("should get user status correctly", () => {
		const state = configureStore().getState();
		const mapped = mapStateToProps(state);
		expect(mapped.logged).toBe(state.user.logged);
	});

	it("public home should has title", () => {
		const c = shallow(<PublicHome />);
		expect(c.dive().find("title").text()).toBe("Home");
	});
	it("private home should has title", () => {
		const c = shallow(<PrivateHome />);
		expect(c.dive().find("title").text()).toBe("Home");
	});
});