export interface UserProfileProps {
	name: string;
	picture: string;
}
export interface UserProps {
	email: string;
	profile: UserProfileProps;
}

export default UserProps;