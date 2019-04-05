import * as React from "react";
import sinon from "sinon";
import { shallow, ShallowWrapper } from "enzyme";
import { SocketProvider, SocketProviderProps } from "../../src/client/SocketProvider";
import { user } from "../../fakes/user";
import DataItemMessage from "../../src/shared/types/sockets/messages/ItemMessage";
import SocketMessageTypes from "../../src/shared/types/sockets/MessageTypes";

describe("Client Socket Provider", () => {
	let c: ShallowWrapper<SocketProviderProps, {}, SocketProvider>;
	let dispatch: sinon.SinonSpy<any, void>;
	let m: DataItemMessage<any> = {
		type: SocketMessageTypes.itemManipulation,
		initiator: user._id,
		data: {
			dataType: "messages",
			manipulation: "create",
			item: { fake: "fake" },
		},
	};
	beforeEach(() => {
		dispatch = sinon.spy();
	});
	it("onDataItemMessage initiator === userId", () => {
		c = shallow(<SocketProvider dispatch={dispatch} userId={user._id}><div id="child"></div></SocketProvider>);
		c.instance().onDataItemMessage(m);
		expect(dispatch.notCalled).toBe(true);
	});
	it("onDataItemMessage dispatch", () => {
		c = shallow(<SocketProvider dispatch={dispatch} userId={user._id}><div id="child"></div></SocketProvider>);
		m.initiator = "any";
		m.data.manipulation = "create";
		c.instance().onDataItemMessage(m);
		expect(dispatch.calledOnce).toBe(true);
		const expected = { type: "MESSAGES/CREATE/SUCCESS", payload: { data: m.data.item, error: undefined } };
		expect(dispatch.calledWith(expected)).toBe(true);
	});

	it("onDataItemMessage routine not exist", () => {
		c = shallow(<SocketProvider dispatch={dispatch} userId={user._id}><div id="child"></div></SocketProvider>);
		const stub = sinon.stub(c.instance(), "reloadDataType");
		c.update();
		(m.data.manipulation as any) = "info";
		c.instance().onDataItemMessage(m);
		expect(stub.calledOnce).toBe(true);
	});

	it("onDataItemMessage routines not exist", () => {
		m.data.manipulation = "create";
		(m.data.dataType as any) = "fake";
		c = shallow(<SocketProvider dispatch={dispatch} userId={user._id}><div id="child"></div></SocketProvider>);
		const stub = sinon.stub(c.instance(), "reloadDataType");
		c.update();
		c.instance().onDataItemMessage(m);
		expect(stub.notCalled).toBe(true);
		expect(dispatch.notCalled).toBe(true);
	});

	it("onDataItemMessage dispatch throws error", () => {
		const d = sinon.spy(() => {
			throw new Error();
		});
		m.data.manipulation = "create";
		m.data.dataType = "foodProviders";
		c = shallow(<SocketProvider dispatch={d} userId={user._id}><div id="child"></div></SocketProvider>);
		const stub = sinon.stub(c.instance(), "reloadDataType");
		c.update();
		c.instance().onDataItemMessage(m);
		expect(stub.calledOnce).toBe(true);
	});
});