import * as React from "react";
import sinon from "sinon";
import { shallow, ShallowWrapper } from "enzyme";
import { Order, OrderProps } from "../../../../../src/client/pages/Home/private/Order";
import { pageDataTypes } from "../../../../../src/client/App";
import routines from "../../../../../src/shared/redux/order/routines";

describe("/client/pages/Home/private/Order", () => {
	let c: ShallowWrapper<OrderProps, {}, Order>;
	let inst: Order;
	const props: OrderProps = {
		classes: {
			fullHeightHiddenOverflow: "string",
			flexColumn: "string",
		},
		loaded: false,
		forceReload: false,
		dispatch: sinon.spy(),
	};
	const d = props.dispatch as sinon.SinonSpy;
	it("should mount correctly", () => {
		c = shallow(<Order {...props} />, {
			disableLifecycleMethods: true,
		});
		inst = c.instance();
		pageDataTypes.clear();
		inst.componentDidMount();
		expect(pageDataTypes.has("order")).toBe(true);
		expect(d.calledOnceWith(routines.get.trigger()));

		d.resetHistory();
		c.setProps({ loaded: true, forceReload: true });
		inst.componentDidMount();
		expect(d.calledOnceWith(routines.get.trigger()));

		d.resetHistory();
		c.setProps({ loaded: true, forceReload: false });
		inst.componentDidMount();
		expect(d.called).toBe(false);
	});
});