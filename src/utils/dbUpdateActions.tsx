import { NextRequest } from "next/server";
import { connect } from "./db";
import { getUserIdUsername } from "./dbSelectActions";

export async function updateProfilePhoto (id: number, filePath: string): Promise<number> {
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
        console.error ("Error in updateProfilePhoto: ", error);
        return -1;
    }
}

export async function updateUserSession (token: string, username: string) {
    try {
        const userId = await getUserIdUsername (username);

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
        console.error ("Error in updateUserSession: ", error);
        return -1;
    }
}

export async function logOutToken (req: NextRequest) {
    try {
        const token = req.cookies.get ('session')!.value;
        const connection = await connect ();
        const updateQuery = 'UPDATE `user_session` SET `user_id` = ? WHERE `session_id` = ?';
        const [result, fields] = await connection.execute (updateQuery, [null, token]);
        connection.end ();

        if (result.affectedRows === 1) {
            console.log ("logged out user: ... idk even know who he was man", )
        }
    } catch (error) {
        console.error ("Error in logOutToken: ", error);
    }
}