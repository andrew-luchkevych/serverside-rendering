import * as React from "react";
import _ from "lodash";
import sinon from "sinon";
import { Map as ImmutableMap } from "immutable";
import { shallow, ShallowWrapper } from "enzyme";
import fakeUser from "../../../../../../../fakes/user";
import fakeOrderRollStats from "../../../../../../../fakes/fakeOrderRollStats";
import fakeFoodProvider from "../../../../../../../fakes/foodProvider";
import fakeOrderVote from "../../../../../../../fakes/fakeOrderVote";
import { mapKey } from "../../../../../../../src/shared/redux/orderFoodProviderVotes";
import orderRollStatsRoutines from "../../../../../../../src/shared/redux/orderRollStats/routines";
import foodProvidersRoutines from "../../../../../../../src/shared/redux/foodProviders/routines";
import orderVotesRoutines from "../../../../../../../src/shared/redux/orderFoodProviderVotes/routines";
import { pageDataTypes } from "../../../../../../../src/client/App";
import { FoodProviderVouting, FoodProviderVoutingProps } from "../../../../../../../src/client/pages/Home/private/Order/vouting/foodProviders";
describe("/client/pages/Home/private/Order/vouting/foodProviders", () => {
	let c: ShallowWrapper<FoodProviderVoutingProps, {}, FoodProviderVouting>;
	let inst: FoodProviderVouting;
	const props: FoodProviderVoutingProps = {
		userId: fakeUser._id,
		isParticipant: true,
		orderRollStats: {
			loaded: false,
			processing: false,
			data: fakeOrderRollStats,
		},
		forceReloadOrderRollStats: false,
		foodProviders: {
			loaded: false,
			processing: false,
			data: [fakeFoodProvider],
		},
		forceReloadFoodProviders: false,
		orderVotes: {
			loaded: false,
			processing: false,
			data: ImmutableMap([[mapKey(fakeOrderVote), fakeOrderVote]]),
		},
		forceReloadOrderVotes: false,
		dispatch: sinon.spy(),
	};
	afterEach(() => {
		(props.dispatch as sinon.SinonSpy).resetHistory();
	});
	it("render", () => {
		c = shallow(<FoodProviderVouting {...props} />, {
			disableLifecycleMethods: true,
		});
		inst = c.instance();
	});

	it("orderRollStats loading", () => {
		let p = _.cloneDeep(props);
		let d = p.dispatch as sinon.SinonSpy;
		pageDataTypes.clear();
		p.foodProviders.loaded = true;
		p.orderVotes.loaded = true;
		c.setProps(p);
		inst.componentDidMount();
		expect(pageDataTypes.has("orderRollStats")).toBe(true);
		expect(d.calledOnce).toBe(true);
		expect(d.calledOnceWith(orderRollStatsRoutines.get.trigger())).toBe(true);

		d.resetHistory();
		p.orderRollStats.loaded = true;
		p.forceReloadOrderRollStats = true;
		c.setProps(p);
		inst.componentDidMount();
		expect(d.calledOnceWith(orderRollStatsRoutines.get.trigger())).toBe(true);
	});

	it("foodProviders loading", () => {
		let p = _.cloneDeep(props);
		let d = p.dispatch as sinon.SinonSpy;
		pageDataTypes.clear();
		p.orderRollStats.loaded = true;
		p.orderVotes.loaded = true;
		c.setProps(p);
		inst.componentDidMount();
		expect(pageDataTypes.has("foodProviders")).toBe(true);
		expect(d.calledOnce).toBe(true);
		expect(d.calledOnceWith(foodProvidersRoutines.get.trigger())).toBe(true);

		d.resetHistory();
		p.foodProviders.loaded = true;
		p.forceReloadFoodProviders = true;
		c.setProps(p);
		inst.componentDidMount();
		expect(d.calledOnceWith(foodProvidersRoutines.get.trigger())).toBe(true);
	});

	it("orderVotes loading", () => {
		let p = _.cloneDeep(props);
		let d = p.dispatch as sinon.SinonSpy;
		pageDataTypes.clear();
		p.orderRollStats.loaded = true;
		p.foodProviders.loaded = true;
		c.setProps(p);
		inst.componentDidMount();
		expect(pageDataTypes.has("orderFoodProviderVotes")).toBe(true);
		expect(d.calledOnce).toBe(true);
		expect(d.calledOnceWith(orderVotesRoutines.get.trigger())).toBe(true);

		d.resetHistory();
		p.orderVotes.loaded = true;
		p.forceReloadOrderVotes = true;
		c.setProps(p);
		inst.componentDidMount();
		expect(d.calledOnceWith(orderVotesRoutines.get.trigger())).toBe(true);
	});
});