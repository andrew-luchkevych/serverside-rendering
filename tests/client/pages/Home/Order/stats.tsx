import * as React from "react";
import sinon from "sinon";
import { shallow, ShallowWrapper } from "enzyme";
import { OrderStats } from "../../../../../src/client/pages/Home/private/Order/stats";
import { DailyStats, DailyStatsProps } from "../../../../../src/client/pages/Home/private/Order/stats/daily";
import { pageDataTypes } from "../../../../../src/client/App";
import routines from "../../../../../src/shared/redux/orderRollStats/routines";

describe("/client/pages/Home/private/Order/stats", () => {
	it("order stats should mount correctly", () => {
		const c = shallow(<OrderStats />);
		expect(c.children().length).toBe(2);
	});

	it("daily stats should mount correctly", () => {
		const props: DailyStatsProps = {
			classes: {
				fullheight: "string",
				flexColumn: "string",
				flexRowCenter: "string",
			},
			orderRollStats: {
				data: undefined,
				loaded: false,
				processing: false,
			},
			forceReload: false,
			dispatch: sinon.spy(),
		};
		const d = props.dispatch as sinon.SinonSpy;
		const c = shallow(<DailyStats {...props} />, {
			disableLifecycleMethods: true,
		});
		const inst = c.instance();
		pageDataTypes.clear();
		inst.componentDidMount();
		expect(pageDataTypes.has("orderRollStats")).toBe(true);
		expect(d.calledOnceWith(routines.get.trigger()));

		d.resetHistory();
		props.orderRollStats.loaded = true;
		props.forceReload = true;
		c.setProps(props);
		inst.componentDidMount();
		expect(d.calledOnceWith(routines.get.trigger()));

		d.resetHistory();
		props.orderRollStats.data = {
			orderId: "fake",
			participants: 10,
		};
		props.forceReload = false;
		c.setProps(props);
		inst.componentDidMount();
		expect(d.called).toBe(false);
	});
});