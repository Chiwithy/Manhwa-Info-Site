import { checkUsernameExists, checkUsernameLogin } from '@/utils/dbCheckActions';
import { getStoredPassword } from '@/utils/dbSelectActions';
import bcrypt from 'bcrypt';

export async function hashSalt (text: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt (parseInt (process.env.NEXT_PUBLIC_SALT_ROUNDS!));
        return await bcrypt.hash (text, salt);
    } catch (error) {
        throw new Error ("Error encrypting password");
    }
}

export async function authLogin (usernameDecrypted: string, passwordDecrypted: string): Promise<boolean> {
    try {
        const usernameCorrect = await checkUsernameLogin (usernameDecrypted);

        if (usernameCorrect) {
            const hashedPassword = await getStoredPassword (usernameDecrypted);
            const passwordCorrect = await bcrypt.compare (passwordDecrypted, hashedPassword);
            return passwordCorrect;
        }
        else return false;
    } catch (error) {
        console.error ("Error in authing login: ", error);
        return false;
    }
}