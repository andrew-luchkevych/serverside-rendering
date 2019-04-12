import * as React from "react";
import sinon from "sinon";
import { shallow, ShallowWrapper } from "enzyme";
import { ParticipatingStats, ParticipatingStatsProps } from "../../../../../src/client/pages/Home/private/Order/stats/participating";
import { NotParticipant, NotParticipantProps } from "../../../../../src/client/pages/Home/private/Order/stats/participating/notParticipant";
import { Participant, ParticipantProps } from "../../../../../src/client/pages/Home/private/Order/stats/participating/participant";
import { pageDataTypes } from "../../../../../src/client/App";
import routines from "../../../../../src/shared/redux/orderRoll/routines";

describe("/client/pages/Home/private/Order/participating", () => {
	it("participating stats should mount correctly", () => {
		const props: ParticipatingStatsProps = {
			classes: {
				fullheight: "string",
				flexColumn: "string",
			},
			loaded: false,
			forceReload: false,
			dispatch: sinon.spy(),
		};
		const d = props.dispatch as sinon.SinonSpy;
		const c = shallow(<ParticipatingStats {...props} />, {
			disableLifecycleMethods: true,
		});
		const inst = c.instance();
		pageDataTypes.clear();
		inst.componentDidMount();
		expect(pageDataTypes.has("orderRollStats")).toBe(true);
		expect(d.calledOnceWith(routines.get.trigger()));

		d.resetHistory();
		c.setProps({ loaded: true, forceReload: true });
		inst.componentDidMount();
		expect(d.calledOnceWith(routines.get.trigger()));

		d.resetHistory();
		const stats = {
			userId: "fake",
			orderId: "fake",
			roll: 20,
			active: true,
		};
		c.setProps({ forceReload: false, stats });
		inst.componentDidMount();
		expect(d.called).toBe(false);
	});

	it("not participant should mount correctly", () => {
		const props: NotParticipantProps = {
			classes: {
				fullheight: "string",
				flexRowCenter: "string",
			},
			processing: false,
			dispatch: sinon.spy(),
		};
		const d = props.dispatch as sinon.SinonSpy;
		const c: ShallowWrapper<NotParticipantProps, {}, NotParticipant> = shallow(<NotParticipant {...props} />);
		const inst = c.instance();
		inst.participate();
		expect(d.calledOnceWith(routines.create.trigger()));
		c.setProps({ processing: true });
	});

	it("participant should mount correctly", () => {
		const props: ParticipantProps = {
			classes: {
				fullheight: "string",
				flexRowCenter: "string",
			},
			processing: false,
			dispatch: sinon.spy(),
		};
		const d = props.dispatch as sinon.SinonSpy;
		const c: ShallowWrapper<ParticipantProps, {}, Participant> = shallow(<Participant {...props} />);
		const inst = c.instance();
		inst.cancelParticipation();
		expect(d.calledOnceWith(routines.remove.trigger()));
		props.data = {
			userId: "fake",
			orderId: "fake",
			roll: 20,
			active: true,
		};
		c.setProps(props);
		c.setProps({ processing: true });
	});
});