import { AuthToken } from "../../server/types/Auth";
export interface UserProfile {
	name: string;
	picture: string;
}
export interface User {
	email: string;
	profile: UserProfile;
}