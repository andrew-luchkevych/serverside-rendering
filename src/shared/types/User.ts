export interface UserProfileProps {
	name: string;
	picture: string;
}
export interface UserProps {
	_id: string;
	email: string;
	profile: UserProfileProps;
}

export default UserProps;