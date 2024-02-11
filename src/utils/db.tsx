import mysql, { Connection } from 'mysql2/promise';

export async function connect(): Promise<Connection> {
    return await mysql.createConnection ({
        host: '127.0.0.1',
        user: 'root',
        password: 'rootie',
        database: 'IMDB',
    });
}