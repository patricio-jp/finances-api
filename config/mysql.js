import { Sequelize } from "sequelize";

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

export const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        dialect: 'mysql',
        host,
        port
    }
);

export const dbConnect = async () => {
    try {
        await sequelize.sync();
        console.log("Connection with database has been established successfully");
    } catch (error) {
        console.error("Can't establish a connection with the database.", error);
    }
}