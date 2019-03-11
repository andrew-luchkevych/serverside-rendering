import { UsersState } from ".";
export const state = ({ users }: { users: UsersState }) => users;
export const loaded = ({ users: { loaded } }) => loaded;
export const query = ({ users: { query } }: { users: UsersState }) => query;
export const items = ({ users: { items } }: { users: UsersState }) => items;
export const usersStatus = ({ users: { loading, loaded, items } }: { users: UsersState }) => {
	return { loading, loaded, items };
};