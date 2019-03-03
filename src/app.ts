import "reflect-metadata";

import * as express from 'express';
import { Response, NextFunction } from 'express';
import * as path from 'path';
import * as morgan from "morgan";
import { createExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";
import { dbConfig } from "./config/db";

const PUBLIC_PATH = path.join(__dirname, '../public');
const INDEX_HTML_PATH = path.join(PUBLIC_PATH, 'index.html');
const API_BASIC_URL = '/';

const app = createExpressServer({
	controllers: [__dirname + "/controllers/*.js"]
});

app.use(morgan("dev"));

app.use(express.static(PUBLIC_PATH));

app.use((req: Request, res: Response, next: NextFunction) => {
	if (!req.url.startsWith(API_BASIC_URL)) {
		res.sendFile(INDEX_HTML_PATH);
	} else {
	  next();
	}
});

async function startServer() {
	const connection = await createConnection(dbConfig);

	app.listen(3000, () => {
		console.log("\nServer started\n");

		connection.isConnected ?
			console.log("DB is connected\n") :
			console.log("DB isn't connected\n");
	});
}

startServer();
