export interface SubmissionControlProps {
	success: (value?: boolean | PromiseLike<boolean>) => void;
	failure: (reason?: any) => void;
}
export interface SubmissionControllerProps extends SubmissionControlProps {
	submission: Promise<boolean>;
}
export const createSubmisisonPromise = (): SubmissionControllerProps => {
	let success: (value?: boolean | PromiseLike<boolean>) => void;
	let failure: (reason?: any) => void;
	const submission = new Promise<boolean>((resolve, reject) => {
		success = resolve;
		failure = reject;
	});
	return {
		submission,
		success,
		failure,
	};
};