import { OptionsObject } from "notistack";
class SnackService {
	static _instance: SnackService;
	static _enqueueSnackbarMock = (message: string | React.ReactNode, options?: OptionsObject) => undefined;
	constructor() {
		if (!SnackService._instance) {
			SnackService._instance = this;
		}
		return SnackService._instance;
	}
	install = (enqueueSnackbar: (message: string | React.ReactNode, options?: OptionsObject) => string | number | null) => {
		this.enqueueSnackbar = enqueueSnackbar;
		this.ready = true;
	}
	uninstall = () => {
		this.enqueueSnackbar = SnackService._enqueueSnackbarMock;
		this.ready = false;
	}
	ready = false;
	enqueueSnackbar = SnackService._enqueueSnackbarMock;
	success = (text: string) => {
		this.enqueueSnackbar(text, {
			variant: "success",
		});
	}
	error = (text: string) => {
		this.enqueueSnackbar(text, {
			variant: "error",
		});
	}
}
export default new SnackService();