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
import {
	FoodProviderVoteItem,
	FoodProviderVoteItemProps,
} from "../../../../../../../src/client/pages/Home/private/Order/vouting/foodProviders/provider";
describe("/client/pages/Home/private/Order/vouting/foodProviders/provider", () => {
	let c: ShallowWrapper<FoodProviderVoteItemProps, {}, FoodProviderVoteItem>;
	let inst: FoodProviderVoteItem;
	const props: FoodProviderVoteItemProps = {
		classes: {
			progress: "string",
			flexColumnVerticalCenter: "string",
			flexRowCenter: "string",
		},
		isParticipant: false,
		provider: fakeFoodProvider,
		votes: ImmutableMap([[mapKey(fakeOrderVote), fakeOrderVote]]),
		participants: 10,
		userId: fakeUser._id,
		dispatch: sinon.spy(),
	};
	const d = props.dispatch as sinon.SinonSpy;
	afterEach(() => {
		(props.dispatch as sinon.SinonSpy).resetHistory();
	});
	it("render", () => {
		c = shallow(<FoodProviderVoteItem {...props} />, {
			disableLifecycleMethods: true,
		});
		inst = c.instance();
	});
	it("vote", () => {
		inst.add();
		expect(d.calledOnceWith(orderVotesRoutines.create.trigger({ data: { foodProviderId: props.provider._id } }))).toBe(true);
	});

	it("unvote", () => {
		inst.remove();
		expect(d.calledOnceWith(orderVotesRoutines.remove.trigger({ data: { foodProviderId: props.provider._id } }))).toBe(true);
	});

	it("shouldComponentUpdate", () => {
		expect(inst.shouldComponentUpdate(props)).toBe(false);
		expect(inst.shouldComponentUpdate({ ...props, votes: ImmutableMap() as any })).toBe(true);
		const notUserVote = _.cloneDeep(fakeOrderVote);
		notUserVote.user._id = "notuservote";
		c.setProps({ isParticipant: true });
		expect(inst.shouldComponentUpdate(props)).toBe(true);
		c.setProps({ isParticipant: true, votes: ImmutableMap([[mapKey(notUserVote), notUserVote]]) });
	});
});