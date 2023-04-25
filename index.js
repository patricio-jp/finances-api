import './config/dotenv.js';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(json());
app.use(cors());
app.use(morgan('dev'));

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
