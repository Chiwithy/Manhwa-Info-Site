import { NextRequest } from "next/server";
import { connect } from "./db";
import { dbGetUserIdSession, dbGetUserIdUsername } from "./dbSelectActions";

export async function dbCheckUsernameExists (username: string): Promise<boolean> {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_credentials` WHERE `user_username` = ? AND `user_active` = ?';
        const [rows, fields] = await connection.execute (checkQuery, [username, 1]);
        connection.end ();

        return (rows[0].count >= 1);
    }
    catch (error) {
        console.error ("Error dbCheckUsernameExists: ", error);
        return true;
    }
}

export async function dbCheckEmailExists (email: string): Promise<boolean> {
    try {
        const connection = await connect ();
        const getUserIDQuery = 'SELECT `user_id` AS `userId` FROM `user_info` WHERE `user_email` = ? ORDER BY `user_id` DESC LIMIT 1';
        const [rows, fields] = await connection.execute (getUserIDQuery, [email]);

        if (rows[0] === undefined)  {
            connection.end ();
            return false;
        }
        else {
            const userId = rows[0].userId;
            const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_credentials` WHERE `user_id` = ? AND `user_active` = ?';
            const [rows2, fields2] = await connection.execute (checkQuery, [userId, 1]);
            connection.end ();

            return (rows2[0].count >= 1);
        }
    } catch (error) {
        console.error ("Error dbCheckEmailExists: ", error);
        return true;
    }
}

export async function dbCheckIfAdminUserId (userId: number): Promise<boolean> {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `admin_info` WHERE `user_id` = ? AND `admin_info_start_date` < NOW() AND (`admin_info_end_date` IS NULL OR `admin_info_end_date` > NOW())';
        const [rows, fields] = await connection.execute (checkQuery, [userId]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error dbCheckIfAdminUserId: ", error);
        return false;
    }
}

export async function dbCheckIfAdminUsername (username: string): Promise<boolean> {
    try {
        const userId = await dbGetUserIdUsername (username);
        return await dbCheckIfAdminUserId (userId);
    } catch (error) {
        console.error ("Error dbCheckIfAdminUsername: ", error);
        return false;
    }
}

export async function dbCheckIfTokenExists (sessionToken: string): Promise<boolean> {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_session` WHERE `session_id` = ? AND `session_expiry` >= NOW()';
        const [rows, fields] = await connection.execute (checkQuery, [sessionToken]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error dbCheckIfTokenExists: ", error);
        return true;
    }
}

export async function dbCheckLoginCredentials (username: string, password: string) {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_credentials` WHERE `user_username` = ? AND `user_password` = ? AND `user_active` = ?';
        const [rows, fields] = await connection.execute (checkQuery, [username, password, 1]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error dbCheckLoginCredentials: ", error);
        return true;
    }
}

export async function dbCheckUsernameCredential (username: string) {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_credentials` WHERE `user_username` = ? AND `user_active` = ?';
        const [rows, fields] = await connection.execute (checkQuery, [username, 1]);
        connection.end ();

        return (rows[0].count >= 1);
    }
    catch (error) {
        console.error ("Error dbCheckUsernameCredential: ", error);
        return false;
    }
}

export async function dbCheckIfTokenLoggedIn (sessionToken: string) {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_session` WHERE `session_id` = ? AND `user_id` IS NOT NULL AND `session_expiry` > NOW()';
        const [rows, fields] = await connection.execute (checkQuery, [sessionToken]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error in dbCheckIfTokenLoggedIn: ", error);
        return false;
    }
}

export async function dbCheckIfUserAdmin (sessionToken: string) {
    try {
        const loggedUserId = await dbGetUserIdSession (sessionToken);
        if (loggedUserId === -1)
            throw new Error ("User is not logged in");

        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_admin_info` WHERE `user_id` = ? AND `user_admin_start_date` < NOW() AND (`user_admin_end_date` > NOW() OR `user_admin_end_date` IS NULL)';
        const [rows, fields] = await connection.execute (checkQuery, [loggedUserId]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error in checkIfTokenUserAdmin: ", error);
        return false;
    }
}

export async function dbCheckIfManhwaAdmin (sessionToken: string) {
    try {
        const loggedUserId = await dbGetUserIdSession (sessionToken);
        if (loggedUserId === -1)
            throw new Error ("User is not logged in");

        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `manhwa_admin_info` WHERE `user_id` = ? AND `manhwa_admin_start_date` < NOW() AND (`manhwa_admin_end_date` > NOW() OR `manhwa_admin_end_date` IS NULL)';
        const [rows, fields] = await connection.execute (checkQuery, [loggedUserId]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error in dbCheckIfManhwaAdmin: ", error);
        return false;
    }
}