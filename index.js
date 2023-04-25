import './config/dotenv.js';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { dbConnect } from './config/mysql.js';
import routes from './app/routes/index.js';

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(json());
app.use(cors());
app.use(morgan('dev'));

app.use("/api/v1", routes);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

dbConnect();
