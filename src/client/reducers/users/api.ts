let getFetchController: AbortController;
let getFetchSignal: AbortSignal;
export const get = (query: string) => new Promise(
	(resolve, reject) => {
		if (!query) {
			reject();
			return;
		}
		if ((window as any).AbortController) {
			if (getFetchController !== undefined) {
				getFetchController.abort();
			}
			getFetchController = new AbortController();
			getFetchSignal = getFetchController.signal;
		}
		const url = `${process.env.API_URL}/search/users?q=${encodeURIComponent(query)}`;
		fetch(url, { signal: getFetchSignal })
			.catch(() => reject())
			.then(res => {
				if (!res || !res.ok) {
					throw new Error("Server Error!");
				}
				return res;
			}).then(res => res.json())
			.catch(() => {
				throw new Error("Server Error!");
			}).then(res => {
				if (res.errors) {
					reject(new Error(res.message));
					return;
				}
				resolve(res);
			}).catch(e => reject(e));
	},
);

export default {
	get,
};