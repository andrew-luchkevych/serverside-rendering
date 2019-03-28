import express, { } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import helmet from "helmet";
import Loadable from "react-loadable";
import compression from "compression";
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import flash from "express-flash";
import passport from "passport";
import expressValidator from "express-validator";
import webpack from "webpack";
import listEndpoints from "express-list-endpoints";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackDev from "../../config/webpack.dev.js";
import populateWithRoutes from "./routes/index";
export default function init() {
	const normalizePort = (port: string) => parseInt(port, 10);
	const PORT = normalizePort(process.env.PORT || "3000");
	const isProd = process.env.NODE_ENV === "production";
	const isServer = process.env.NODE_ENV === "server";
	const SESSION_SECRET = process.env.SESSION_SECRET || "";
	const MONGODB_URI = process.env.MONGODB_URI || "";
	const app = express();
	// tslint:disable-next-line: no-var-requires
	const MongoStore = require("connect-mongo")(session);
	const mongoSession = session({
		resave: true,
		saveUninitialized: true,
		secret: SESSION_SECRET,
		store: new MongoStore({
			url: MONGODB_URI,
			autoReconnect: true,
		}),
	});

	app.disable("x-powered-by");
	app.use(compression());
	app.use(helmet());
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(expressValidator());
	app.use(mongoSession);
	app.use(flash());
	app.use(lusca.xframe("SAMEORIGIN"));
	app.use(lusca.xssProtection(true));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use((req, res, next) => {
		res.locals.user = req.user;
		next();
	});

	populateWithRoutes(app);
	console.log(listEndpoints(app));
	process.stdin.resume(); // so the program will not close instantly

	function exitHandler(options: any, err: any) {
		if (options.cleanup) {
			process.stdout.write("clean");
		}
		if (err) {
			process.stdout.write(err.stack);
		}
		if (options.exit) {
			process.exit();
		}
	}

	// do something when app is closing
	process.on("exit", exitHandler.bind(null, { cleanup: true }));

	// catches ctrl+c event
	process.on("SIGINT", exitHandler.bind(null, { exit: true }));

	// catches "kill pid" (for example: nodemon restart)
	process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
	process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

	// catches uncaught exceptions
	// process.on("uncaughtException", exitHandler.bind(null, { exit: true }));

	if (!isProd && !isServer) {
		const config: any = webpackDev;
		const compiler = webpack(config);
		const options: any = {
			serverSideRender: true,
			stats: {
				colors: true,
			},
		};
		app.use(webpackDevMiddleware(compiler, options));
		app.use(webpackHotMiddleware(compiler));
		Loadable.preloadAll().then(() => {
			app.listen(PORT, () => process.stdout.write(`Server started with port: ${PORT} \n`));
		});
	} else {
		app.use(express.static(path.join(__dirname, "..", "..", "dist"), { redirect: false }));
		Loadable.preloadAll().then(() => {
			app.listen(PORT, () => process.stdout.write(`Started production with port: ${PORT} \n`));
		});
	}
}