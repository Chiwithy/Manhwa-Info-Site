import { connect } from "./db";

export async function insertUser (name: string, email: string, phone: string, photoPath: string): Promise<number> {
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
        console.error ("Error in insertUser: ", error);
        return -1;
    }
}

export async function insertUserCredentials (id: number, username: string, password: string): Promise<number> {
    try {
        const connection = await connect ();
        const insertQuery = 'INSERT INTO `user_credentials` (`user_id`, `user_username`, `user_password`, `user_active`) VALUES (?, ?, ?, ?)';
        const [result, fields] = await connection.execute (insertQuery, [id, username, password, 1]);
        connection.end ();

        if (result.affectedRows === 1)
            return 1;

        return -1;
    } catch (error) {
        console.error ("Error in insertUserCredentials: ", error);
        return -1;
    }
}

export async function insertActivity (session: string, userId: number, activity: string): Promise<number> {
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
        console.error ("Error in insertActivity: ", error);
        return -1;
    }
}

export async function insertUserSession (session: string) {
    try {
        const connection = await connect ();
        const insertQuery = 'INSERT INTO `user_session` (`session_id`, `session_time_in`, `session_expiry`) VALUES (?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))';
        const [result, fields] = await connection.execute (insertQuery, [session]);
        connection.end ();

        if (result.affectedRows === 1)
            return 1;

        return -1;
    } catch (error) {
        console.error ("Error in insertUserSession: ", error);
        return -1;
    }
}