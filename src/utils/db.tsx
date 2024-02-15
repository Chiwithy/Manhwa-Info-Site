import mysql, { Connection } from 'mysql2/promise';

export async function connect(): Promise<Connection> {
    return await mysql.createConnection ({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });
}