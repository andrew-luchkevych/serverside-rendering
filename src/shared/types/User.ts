import { AuthToken } from "./Auth";
export interface UserProfile {
	name: string;
	picture: string;
};
export interface User {
	email: string;
	password: string;
	passwordResetToken: string;
	passwordResetExpires: Date;
	facebook: string;
	tokens: AuthToken[];
	profile: UserProfile;
}