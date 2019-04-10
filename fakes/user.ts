import UserProps from "../src/shared/types/User";
export const fakeUser: UserProps = {
	_id: "fakeuser",
	email: "fake@email.com",
	profile: {
		name: "fake",
		picture: "https://fake.com",
	},
};

export default fakeUser;