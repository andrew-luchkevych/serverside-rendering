import * as React from "react";
import sinon from "sinon";
import { shallow, ShallowWrapper } from "enzyme";
import { SocketProvider, SocketProviderProps } from "../../src/client/SocketProvider";
import { user } from "../../fakes/user";
import DataItemMessage from "../../src/shared/types/sockets/messages/ItemMessage";
import SocketMessageTypes from "../../src/shared/types/sockets/MessageTypes";
import { pageDataTypes } from "../../src/client/App";

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
		let expected = { type: "MESSAGES/CREATE/SUCCESS", payload: { data: m.data.item, error: undefined } };
		expect(dispatch.calledWith(expected)).toBe(true);

		dispatch.resetHistory();
		m.data.manipulation = "edit";
		c.instance().onDataItemMessage(m);
		expect(dispatch.calledOnce).toBe(true);
		expected.type = "MESSAGES/EDIT/SUCCESS";
		expect(dispatch.calledWith(expected)).toBe(true);

		dispatch.resetHistory();
		m.data.manipulation = "remove";
		c.instance().onDataItemMessage(m);
		expect(dispatch.calledOnce).toBe(true);
		expected.type = "MESSAGES/REMOVE/SUCCESS";
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
		stub.restore();
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

	it("reloadDataType pageDataTypes exists", () => {
		c = shallow(<SocketProvider dispatch={dispatch} userId={user._id}><div id="child"></div></SocketProvider>);
		pageDataTypes.add("foodTypes");
		c.instance().reloadDataType("foodTypes");
		expect(dispatch.calledWith({
			type: "FOOD_TYPE/HOT_RELOAD/TRIGGER",
		}));
		pageDataTypes.add("fake" as any);
		dispatch.resetHistory();
		c.instance().reloadDataType("fake" as any);
		expect(dispatch.calledOnceWith({
			type: "FORCE_RELOAD_DATA/add/SUCCESS", payload: {
				data: {
					dataType: "fake",
				},
				error: undefined,
			},
		})).toBe(true);
	});
	it("reloadDataType pageDataTypes exists, but type not found", () => {
		c = shallow(<SocketProvider dispatch={dispatch} userId={user._id}><div id="child"></div></SocketProvider>);
		c.instance().reloadDataType("fake" as any);
		expect(dispatch.calledOnceWith({
			type: "FORCE_RELOAD_DATA/add/SUCCESS", payload: {
				data: {
					dataType: "fake",
				},
				error: undefined,
			},
		})).toBe(true);
	});
	it("onUpdateDataType", () => {
		const stub = sinon.stub(c.instance(), "reloadDataType");
		c.update();
		c.instance().onUpdateDataType({
			type: SocketMessageTypes.updateDataType,
			initiator: user._id,
			data: {
				dataType: "foodTypes",
			},
		});
		expect(stub.calledOnceWith("foodProviders")).toBe(true);
		stub.restore();
		c.update();
	});

	it("should cancel socket on unmount", () => {
		const removeListenerStub = sinon.stub(c.instance().socket, "removeListener");
		const closeSocketStub = sinon.stub(c.instance().socket, "close");
		const udt = c.instance().onUpdateDataType;
		const dim = c.instance().onDataItemMessage;
		c.update();
		c.unmount();
		expect(removeListenerStub.calledWith(SocketMessageTypes.updateDataType, udt)).toBe(true);
		expect(removeListenerStub.calledWith(SocketMessageTypes.itemManipulation, dim)).toBe(true);
		expect(closeSocketStub.calledOnce).toBe(true);
	});
});