import { connect } from "./db";
import { dbGetUserIdUsername } from "./dbSelectActions";

export async function dbUpdateProfilePhoto (id: number, filePath: string): Promise<number> {
    try {
        const connection = await connect ();
        const updateQuery = 'UPDATE `user_info` SET `user_photo` = ? WHERE `user_id` = ?';
        const [result, fields] = await connection.execute (updateQuery, [filePath, id]);
        connection.end ();

        if (result.affectedRows === 1) {
            console.log ("successfully linked image: ", filePath);
            return 1;
        }

        return -1;
    } catch (error) {
        console.error ("Error in dbUpdateProfilePhoto: ", error);
        return -1;
    }
}

export async function dbUpdateUserSession (token: string, username: string) {
    try {
        const userId = await dbGetUserIdUsername (username);

        if (userId === -1)
            throw new Error ("Error in updateUserSession after getUserId");
        else {
            const connection = await connect ();
            const updateQuery = 'UPDATE `user_session` SET `user_id` = ? WHERE `session_id` = ?';
            const [result, fields] = await connection.execute (updateQuery, [userId, token]);
            connection.end ();

            if (result.affectedRows === 1) {
                console.log ("successfully linked session to userId");
                return 1;
            }

            return -1;
        }
    } catch (error) {
        console.error ("Error in dbUpdateUserSession: ", error);
        return -1;
    }
}

export async function dbUpdateLogOut (token: string) {
    try {
        const connection = await connect ();
        const updateQuery = 'UPDATE `user_session` SET `user_id` = ? WHERE `session_id` = ?';
        const [result, fields] = await connection.execute (updateQuery, [null, token]);
        connection.end ();

        if (result.affectedRows === 1) {
            console.log ("logged out user: ... idk even know who he was man")
        }
    } catch (error) {
        console.error ("Error in dbUpdateLogOut: ", error);
    }
}

export async function dbUpdateAdminActionStatus (action_id: number, status: string) {
    try {
        const connection = await connect ();
        const updateQuery = 'UPDATE `admin_actions` SET `status` = ? WHERE `action_id` = ?';
        const [result, fields] = await connection.execute (updateQuery, [status, action_id]);
        connection.end ();
    } catch (error) {
        console.error ("Error in dbUpdateAdminActionStatus: ", error);
    }
}