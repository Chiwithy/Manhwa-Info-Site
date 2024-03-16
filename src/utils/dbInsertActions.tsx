import { connect } from "./db";
import { dbGetUserIdSession } from "./dbSelectActions";

export async function dbInsertUserInfo (name: string, email: string, phone: string, photoPath: string): Promise<number> {
    try {
        const connection = await connect ();
        const insertQuery = 'INSERT INTO `user_info` (`user_name`, `user_email`, `user_phone`, `user_photo`) VALUES (?, ?, ?, ?)';
        const [result, fields]= await connection.execute (insertQuery, [name, email, phone, photoPath]);

        if (result.affectedRows === 1) {
            const [rows, fields] = await connection.execute ('SELECT DISTINCT LAST_INSERT_ID() AS latestId FROM user_info');
            connection.end ();
            return rows[0].latestId;
        }

        return -1;
    } catch (error) {
        console.error ("Error in dbInsertUser: ", error);
        return -1;
    }
}

export async function dbInsertUserCredentials (id: number, username: string, password: string): Promise<number> {
    try {
        const connection = await connect ();
        const insertQuery = 'INSERT INTO `user_credentials` (`user_id`, `user_username`, `user_password`, `user_active`) VALUES (?, ?, ?, ?)';
        const [result, fields] = await connection.execute (insertQuery, [id, username, password, 1]);
        connection.end ();

        if (result.affectedRows === 1)
            return 1;

        return -1;
    } catch (error) {
        console.error ("Error in dbInsertUserCredentials: ", error);
        return -1;
    }
}

export async function dbInsertActivity (session: string, userId: number, activity: string): Promise<number> {
    try {
        const connection = await connect ();
        if (userId !== -1) {
            const insertQuery = 'INSERT INTO `activity_log` (`session_id`, `user_id`, `activity_activity`, `activity_datetime`) VALUES (?, ?, ?, NOW())';
            const [result, fields] = await connection.execute (insertQuery, [session, userId, activity]);
            connection.end ();

            if (result.affectedRows === 1)
                return 1;
        } else {
            const insertQuery = 'INSERT INTO `activity_log` (`session_id`, `activity_activity`, `activity_datetime`) VALUES (?, ?, NOW())';
            const [result, fields] = await connection.execute (insertQuery, [session, activity]);
            connection.end ();

            if (result.affectedRows === 1)
                return 1;
        }
        
        return -1;
    } catch (error) {
        console.error ("Error in dbInsertActivity: ", error);
        return -1;
    }
}

export async function dbInsertUserSession (session: string) {
    try {
        const connection = await connect ();
        const insertQuery = 'INSERT INTO `user_session` (`session_id`, `session_time_in`, `session_expiry`) VALUES (?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))';
        const [result, fields] = await connection.execute (insertQuery, [session]);
        connection.end ();

        if (result.affectedRows === 1)
            return 1;

        return -1;
    } catch (error) {
        console.error ("Error in dbInsertUserSession: ", error);
        return -1;
    }
}

export async function dbInsertManhwa (session: string, title: string, description: string, imageName: string, sites: number[], genres: string[]) {
    try {
        const connection = await connect ();
        const insertQuery = 'INSERT INTO `manhwa_info` (`manhwa_title`, `manhwa_description`, `manhwa_photo`) VALUES (?, ?, ?)';
        const [result, fields] = await connection.execute (insertQuery, [title, description, imageName]);
        connection.end ();

        if (result.affectedRows === 1)
            return 1;

        return -1;
    } catch (error) {
        console.error ("Error in dbInsertManhwa: ", error);
        return -1;
    }

}

export async function dbInsertAdminAction (session: string, adminType: string, actionType: string, action: string) {
    try {
        const admin_id = await dbGetUserIdSession (session);
        if (admin_id != -1) {
            const connection = await connect ();
            const insertQuery = 'INSERT INTO `admin_actions` (`admin_id`, `admin_type`, `action_type`, `action`, `status`, `action_datetime`) VALUES (?, ?, ?, ?, ?, NOW())';
            const [result, fields] = await connection.execute (insertQuery, [admin_id, adminType, actionType, action, "PENDING"]);
            connection.end ();

            if (result.affectedRows === 1)
                return 1;

            return -1;
        }
    } catch (error) {
        console.error ("Error in dbInsertAdminAction: ", error);
        return -1;
    }
}