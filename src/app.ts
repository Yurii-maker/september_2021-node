import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { apiRouter } from './routers/apiRouter';
import { config } from './configs/config';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

app.listen(config.PORT, async () => {
    console.log('Server has started!!!');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DB connected');
        }
    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
});
