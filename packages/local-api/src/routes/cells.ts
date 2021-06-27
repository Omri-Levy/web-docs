import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
	id: string;
	content: string;
	type: `text` | `code`;
}

const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router();
	const fullPath= path.join(dir, filename);

	router.use(express.json());

	router.get(`/cells`, async (req, res) => {
		try {
			const result = await fs.readFile(fullPath, { encoding: `utf-8`});

			res.send(JSON.parse(result));
		} catch (err) {
			if (err.code == `ENOENT`) {
				await fs.writeFile(fullPath, `[]`, `utf-8`);

				res.send([]);
			} else {
				throw err;
			}
		}

		res.status(200).send({status: `OK`});
	});

	router.post(`/cells`, async (req, res) => {
		const {cells}: { cells: Cell[] } = req.body;

		await fs.writeFile(fullPath, JSON.stringify(cells), `utf-8`);

		res.send({status: `OK`});
	});

	return router;
}

export {createCellsRouter};
