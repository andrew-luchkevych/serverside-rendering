import crypto from "crypto";
export type GenerateGravatarFunction = (name: string, size?: number) => string;

const generateGravatar: GenerateGravatarFunction = (name: string, size: number = 200): string => {
	const md5 = crypto.createHash("md5").update(name).digest("hex");
	return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export default generateGravatar;