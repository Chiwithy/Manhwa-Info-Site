import { NextRequest } from "next/server";
import { connect } from "./db";
import { getUserIdSession, getUserIdUsername } from "./dbSelectActions";

export async function checkUsernameExists (username: string): Promise<boolean> {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_credentials` WHERE `user_username` = ? AND `user_active` = ?';
        const [rows, fields] = await connection.execute (checkQuery, [username, 1]);
        connection.end ();

        return (rows[0].count >= 1);
    }
    catch (error) {
        console.error ("Error checkUsernameExists: ", error);
        return true;
    }
}

export async function checkEmailExists (email: string): Promise<boolean> {
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
        console.error ("Error checkEmailExists: ", error);
        return true;
    }
}

export async function checkIfAdminUserId (userId: number): Promise<boolean> {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `admin_info` WHERE `user_id` = ? AND `admin_info_start_date` < NOW() AND (`admin_info_end_date` IS NULL OR `admin_info_end_date` > NOW())';
        const [rows, fields] = await connection.execute (checkQuery, [userId]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error checkIfAdminUserId: ", error);
        return false;
    }
}

export async function checkIfAdminUsername (username: string): Promise<boolean> {
    try {
        const userId = await getUserIdUsername (username);
        return await checkIfAdminUserId (userId);
    } catch (error) {
        console.error ("Error checkIfAdminUsername: ", error);
        return false;
    }
}

export async function checkIfTokenExists (token: string): Promise<boolean> {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_session` WHERE `session_id` = ? AND `session_expiry` >= NOW()';
        const [rows, fields] = await connection.execute (checkQuery, [token]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error checkIfTokenExists: ", error);
        return true;
    }
}

export async function checkLoginCredentials (username: string, password: string) {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_credentials` WHERE `user_username` = ? AND `user_password` = ? AND `user_active` = ?';
        const [rows, fields] = await connection.execute (checkQuery, [username, password, 1]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error checkLoginCredentials: ", error);
        return true;
    }
}

export async function checkUsernameLogin (username: string) {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_credentials` WHERE `user_username` = ? AND `user_active` = ?';
        const [rows, fields] = await connection.execute (checkQuery, [username, 1]);
        connection.end ();

        return (rows[0].count >= 1);
    }
    catch (error) {
        console.error ("Error checkUsernameLogin: ", error);
        return false;
    }
}

export async function checkIfTokenLoggedIn (token: string) {
    try {
        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `user_session` WHERE `session_id` = ? AND `user_id` IS NOT NULL AND `session_expiry` > NOW()';
        const [rows, fields] = await connection.execute (checkQuery, [token]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error in checkIfUser: ", error);
        return false;
    }
}

//ASSUMED TOKEN IS ALRDY LOGGED USER (use ONLY AFTER checking user)
export async function checkIfTokenAdmin (token: string) {
    try {
        const loggedUserId = await getUserIdSession (token);
        if (loggedUserId === -1)
            throw new Error ("User is not logged in");

        const connection = await connect ();
        const checkQuery = 'SELECT COUNT(*) AS `count` FROM `admin_info` WHERE `user_id` = ? AND `admin_info_start_date` < NOW() AND (`admin_info_end_date` > NOW() OR `admin_info_end_date` IS NULL)';
        const [rows, fields] = await connection.execute (checkQuery, [loggedUserId]);
        connection.end ();

        return (rows[0].count >= 1);
    } catch (error) {
        console.error ("Error in checkIfAdmin: ", error);
        return false;
    }
}