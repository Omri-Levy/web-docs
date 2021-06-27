import {Command} from 'commander';
import {serve} from '@web-docs/local-api';
import path from 'path';

const serveCommand = new Command()
	.command(`serve [filename]`)
	.description(`Open a file for editing`)
	.option('-p, --port <number>', 'port to run server on', '4005')
	.action(async (filename = 'web-docs.js', options) => {
		try {
			const dir = path.join(process.cwd(), path.dirname(filename))
			const file = path.basename(filename);
			const port = parseInt(options.port);
			const logMessage = `Opened ${filename} - Navigate to ` +
				`http://localhost:${port}/ to edit the file.`
			const isProduction = process.env.NODE_ENV === `production`;
console.log(isProduction);
			await serve(port, file, dir, isProduction);

			console.log(logMessage);
		} catch (err) {
			if (err.code === `EADDRINUSE`) {
				console.error(
					`Port is in use. Try running on a different port.`)
			} else {
				console.error(`Error: ${err.message}`);
			}
		}
	})

export {serveCommand};
