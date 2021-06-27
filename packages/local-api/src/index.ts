import express from "express";
import {createProxyMiddleware} from 'http-proxy-middleware';
import path from 'path';
import {createCellsRouter} from './routes/cells';

const serve = (port: number, filename: string, dir: string, dev?: boolean) => {
	const app = express();

	app.use(createCellsRouter(filename, dir));

	// serves the build folder from @web-docs/local-client if in production mode -
	// proxies to CRA dev server if the -D/--dev flag is provided to the
	// serve command.
	if (dev) {
		app.use(createProxyMiddleware({
			target: `http://localhost:3000`,
			ws: true,
			logLevel: `silent`
		}))
	} else {
		const packagePath = require.resolve(
			'@web-docs/local-client/build/index.html');

		app.use(express.static(path.dirname(packagePath)));
	}

	return new Promise<void>((resolve, reject) => {
		app.listen(port, resolve).on('error', reject);
	});
};

export {serve};
