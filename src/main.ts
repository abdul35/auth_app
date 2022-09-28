import dotenv from 'dotenv';
import express, { Express } from 'express';
import router from './router/index'
dotenv.config()

const app: Express = express();
const PORT = process.env.PORT;

app.use('/api', router);

try {
    app.listen(PORT, () => {
        console.log(`Server has been started on http://localhost:${PORT}!`)
    })
} catch (error) {
    throw Error('Server is not started:( - \n' + error)
}