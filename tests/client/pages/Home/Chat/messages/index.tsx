import * as React from "react";
import sinon from "sinon";
import { shallow, ShallowWrapper } from "enzyme";
import { Map as ImmutableMap } from "immutable";
import Typography from "@material-ui/core/Typography";
import fakeMessage from "../../../../../../fakes/message";
import routines from "../../../../../../src/shared/redux/messages/routines";
import Loader from "../../../../../../src/client/components/Loader";
import { MessagesList, MessagesListProps } from "../../../../../../src/client/pages/Home/private/Chat/messages";
describe("/client/pages/Home/private/Chat/messages", () => {
	let c: ShallowWrapper<MessagesListProps, {}, MessagesList>;
	let inst: MessagesList;
	const props: MessagesListProps = {
		classes: {
			messagesListWrapper: "string",
			list: "string",
		},
		onMessageEdit: sinon.spy(),
		onMessageRemove: sinon.spy(),
		dispatch: sinon.spy(),
		messages: ImmutableMap([[fakeMessage._id, fakeMessage]]),
		processing: false,
		loaded: false,
		canLoadMore: true,
	};
	const d = props.dispatch as sinon.SinonSpy;
	const wrapperRefFake = {
		current: {
			addEventListener: sinon.spy(),
			removeEventListener: sinon.spy(),
			scrollTop: 0,
			scrollHeight: 400,
			scrollTo: sinon.spy(),
		},
	};
	it("should init correctly", () => {
		c = shallow(<MessagesList {...props} />, {
			disableLifecycleMethods: true,
		});
		inst = c.instance();
		inst.wrapperRef = wrapperRefFake as any;
		d.resetHistory();
		const now = (new Date()).getTime() - 1000;
		inst.componentDidMount();
		expect(d.calledOnceWith(routines.get.trigger()));
		expect(inst.loadMoreTime).toBeGreaterThan(now);
		expect(
			(inst.wrapperRef.current.addEventListener as sinon.SinonSpy)
				.calledOnceWith("scroll", inst.loadMore),
		).toBe(true);
	});

	it("should load more messages", () => {
		inst.loadMoreTime = (new Date()).getTime() - 4000;
		d.resetHistory();
		inst.loadMore();
		expect(d.calledOnceWith(routines.more.trigger()));
	});

	it("should return true if messages count changed and container scrolled to bottom", () => {
		expect(inst.getSnapshotBeforeUpdate(props)).toBe(null);
		const prevProps = { ...props };
		prevProps.messages = ImmutableMap();
		expect(inst.getSnapshotBeforeUpdate(prevProps)).toBe(true);
	});

	it("should scroll to bottom after update", () => {
		const stub = sinon.stub(inst, "scrollToBottom");
		inst.componentDidUpdate({} as any, {} as any, null);
		expect(stub.called).toBe(false);
		inst.componentDidUpdate({} as any, {} as any, true);
		expect(stub.calledOnce).toBe(true);
		stub.restore();
	});

	it("should scroll to bottom", () => {
		(inst.wrapperRef.current.scrollTo as sinon.SinonSpy).resetHistory();
		inst.scrollToBottom();
		expect(
			(inst.wrapperRef.current.scrollTo as sinon.SinonSpy)
				.calledOnce,
		).toBe(true);
	});

	it("should unbind scroll listener on unmount", () => {
		inst.componentWillUnmount();
		expect(
			(inst.wrapperRef.current.removeEventListener as sinon.SinonSpy)
				.calledOnceWith("scroll", inst.loadMore),
		).toBe(true);
	});

	it("should show loader on processing", () => {
		c.setProps({ processing: true });
		c.update();
		expect(c.find(Loader).length).toBe(1);
	});

	it("should show no items message if messages size = 0", () => {
		c.setProps({
			processing: false,
			loaded: true,
		});
		c.update();
		expect(c.children.length).toBe(1);
		c.setProps({
			messages: ImmutableMap() as any,
		});
		c.update();
		expect(c.childAt(1).is(Typography)).toBe(true);
	});
});