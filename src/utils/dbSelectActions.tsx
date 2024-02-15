import { connect } from "./db";

export async function getUserIdUsername (username: string): Promise<number> {
    try {
        const connection = await connect ();
        const selectQuery = 'SELECT `user_id` AS `userId` FROM `user_credentials` WHERE `user_username` = ? AND `user_active` = ?';
        const [rows, fields] = await connection.execute (selectQuery, [username, 1]);
        connection.end ();

        if (rows[0] === undefined)
            throw new Error ("User does not exist");
        else
            return rows[0].userId;
    } catch (error) {
        console.error ("Error at getUserIdUsername: ", error);
        return -1
    }
}

export async function getStoredPassword (username: string): Promise<string> {
    try {
        const connection = await connect ();
        const selectQuery = 'SELECT `user_password` AS `userPassword` FROM `user_credentials` WHERE `user_username` = ? AND `user_active` = ?';
        const [rows, fields] = await connection.execute (selectQuery, [username, 1]);
        connection.end ();

        if (rows[0] === undefined)
            throw new Error ("User does not exist");
        else
            return rows[0].userPassword;
    } catch (error) {
        console.error ("Error at getStoredPassword: ", error);
        return "err";
    }
}

export async function getUserIdSession (token: string) {
    try {
        const connection = await connect ();
        const selectQuery = 'SELECT `user_id` AS `userId` FROM `user_session` WHERE `session_id` = ? AND `session_expiry` > NOW()';
        const [rows, fields] = await connection.execute (selectQuery, [token]);
        connection.end ();

        if (rows[0] === undefined)
            throw new Error ("User does not exist");
        else
            return rows[0].userId;
    } catch (error) {
        console.error ("Error at getUserIdSession: ", error);
        return -1
    }
}