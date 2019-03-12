import bcrypt from "bcrypt-nodejs";
import crypto from "crypto";
import mongoose from "mongoose";
import { User as IUser } from "../../shared/types/User";
import { AuthToken } from "../types/Auth";
export { AuthToken } from "../types/Auth";
export type UserModel = mongoose.Document & IUser & {
	password: string;
	passwordResetToken: string;
	passwordResetExpires: Date;
	facebook: string;
	tokens: Array<AuthToken>;
	comparePassword: comparePasswordFunction,
	gravatar: (size: number) => string;
};

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

const userSchema = new mongoose.Schema({
	email: { type: String, unique: true },
	password: String,
	passwordResetToken: String,
	passwordResetExpires: Date,

	facebook: String,
	google: String,
	tokens: Array,

	profile: {
		name: String,
		gender: String,
		location: String,
		website: String,
		picture: String,
	},
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
	const user = this as UserModel;
	if (!user.isModified("password")) { return next(); }
	bcrypt.genSalt(10, (err, salt) => {
		if (err) { return next(err); }
		bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
			if (err) { return next(err); }
			user.password = hash;
			next();
		});
	});
});

const comparePassword: comparePasswordFunction = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
		cb(err, isMatch);
	});
};

userSchema.methods.comparePassword = comparePassword;

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number) {
	if (!size) {
		size = 200;
	}
	if (!this.email) {
		return `https://gravatar.com/avatar/?s=${size}&d=retro`;
	}
	const md5 = crypto.createHash("md5").update(this.email).digest("hex");
	return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model("User", userSchema);
export default User;