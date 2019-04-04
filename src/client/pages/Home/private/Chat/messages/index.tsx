import * as React from "react";
import { connect } from "react-redux";
import { Map as ImmutableMap } from "immutable";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { styles } from "./styles";
import MessageProps from "../../../../../../shared/types/Message";
import WithDispatch from "../../../../../../shared/types/store/dispatch";
import { ReduxStoreState } from "../../../../../../shared/types/store/RootReducer";
import { getMessages, isMessagesProcessing, isMessagesLoaded, canLoadMoreMessages } from "../../../../../../shared/redux/messages/selectors";
import routines from "../../../../../../shared/redux/messages/routines";
import Loader from "../../../../../components/Loader";
import { Typography } from "@material-ui/core";
import MessageItem from "./message";

export interface MessagesListOwnProps {
	onMessageEdit: (message: MessageProps) => any;
	onMessageRemove: (id: string) => any;
}
export interface MessagesListStyleProps {
	classes: {
		messagesListWrapper: string;
		list: string;
	};
}

export interface MessagesListConnectedProps {
	messages: ImmutableMap<string, MessageProps>;
	processing: boolean;
	loaded: boolean;
	canLoadMore: boolean;
}
export type MessagesListProps = MessagesListOwnProps & MessagesListStyleProps & MessagesListConnectedProps & WithDispatch;
export class MessagesList extends React.PureComponent<MessagesListProps> {
	wrapperRef: React.RefObject<HTMLDivElement> = React.createRef();
	shouldScrollToBottom = false;
	componentDidMount() {
		if (!this.props.loaded) {
			this.props.dispatch(routines.get.trigger());
		}
		this.wrapperRef.current.addEventListener("scroll", this.loadMore);
	}
	loadMore = () => {
		if (this.wrapperRef.current.scrollTop < 500 && !this.props.processing && this.props.canLoadMore) {
			this.props.dispatch(routines.more.trigger());
		}
	}
	getSnapshotBeforeUpdate(prevProps: MessagesListProps) {
		if (prevProps.messages.size < this.props.messages.size) {
			const target = this.wrapperRef.current;
			const currentScroll = target.scrollTop;
			const scrollHeight = target.scrollHeight;
			if (scrollHeight - currentScroll < 300) {
				return true;
			}
		}
		return null;
	}
	componentDidUpdate(_prevProps: MessagesListProps, _prevState: {}, snapshot: boolean | null) {
		if (snapshot === true) {
			this.scrollToBottom();
		}
	}
	componentWillUnmount() {
		this.wrapperRef.current.removeEventListener("scroll", this.loadMore);
	}
	scrollToBottom = () => {
		this.wrapperRef.current.scrollTo({
			top: this.wrapperRef.current.scrollHeight,
			behavior: "smooth",
		});
	}
	noItems = <Typography>There is no messages yet.</Typography>;
	noMoreItems = <Typography>There is no more messages.</Typography>;
	render() {
		const { classes, messages, processing, loaded, onMessageEdit, onMessageRemove } = this.props;
		return (
			<div className={classes.messagesListWrapper} ref={this.wrapperRef}>
				<List dense>
					{messages.valueSeq().map(v => (
						<MessageItem
							key={v._id}
							message={v}
							onEdit={onMessageEdit}
							onRemove={onMessageRemove}
						/>
					))}
				</List>
				{
					processing
						? <Loader />
						: loaded
							? messages.size
								? null
								: this.noItems
							: null
				}
			</div>
		);
	}
}
const mapStateToProps = (state: ReduxStoreState): MessagesListConnectedProps => ({
	messages: getMessages(state),
	processing: isMessagesProcessing(state),
	loaded: isMessagesLoaded(state),
	canLoadMore: canLoadMoreMessages(state),
});
export default connect(mapStateToProps)(withStyles(styles)(MessagesList)) as React.ComponentType<MessagesListOwnProps>;