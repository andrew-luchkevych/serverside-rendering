import { UserState } from ".";
export const logged = ({ user: { logged } }: { user: UserState }) => logged;
export const user = ({ user: { data } }: { user: UserState }) => data;
export const userState = ({ user }: { user: UserState }) => user;