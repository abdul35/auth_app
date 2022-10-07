import dotenv from 'dotenv';
import express from 'express';
import 'module-alias/register';
import cors from 'cors';

import router from './router/index';

dotenv.config()

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use('/api', router);


(async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server has been started on http://localhost:${PORT}!`)
        })
    } catch (error) {
        throw Error('Server is not started:( - \n' + error)
    }
})()