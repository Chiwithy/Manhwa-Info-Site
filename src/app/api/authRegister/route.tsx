import { NextRequest, NextResponse } from 'next/server';
import { validateName, validateEmail, validatePhone, validateUsername, validatePassword } from '@/components/utility/regex/regex';
import { decrypt } from '@/components/utility/functions/encryptFunctions';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { dbInsertUserInfo, dbInsertUserCredentials } from '@/utils/dbInsertActions';
import { dbCheckEmailExists, dbCheckUsernameExists } from '@/utils/dbCheckActions';
import { dbUpdateProfilePhoto } from '@/utils/dbUpdateActions';
import { insertSessionActivityPOST } from '@/components/utility/functions/cookieFunctions';
import { hashSalt } from '@/components/utility/functions/passwordFunctions';
import { checkIfLoggedIn } from '@/components/utility/functions/authFunctions';

async function isNoDuplicate (username: string, email: string) {
    const uExist = await dbCheckUsernameExists (username);
    const eExist = await dbCheckEmailExists (decrypt (email));
    return (!(await dbCheckUsernameExists (username)) && !(await dbCheckEmailExists (email)));
}

function isDataValid (name: string, email: string, phone: string, username: string, password: string) {
    const emailDecrypted = decrypt (email);
    const phoneDecrypted = decrypt (phone);
    const passwordDecrypted = decrypt (password);

    return (validateName (name) && validateEmail (emailDecrypted) && validatePhone (phoneDecrypted) && validateUsername (username) && validatePassword (passwordDecrypted));
};

export async function POST (req: NextRequest){
    try {
        const isLoggedIn = await checkIfLoggedIn (req.cookies.get ('session')!.value);
        await insertSessionActivityPOST (req);

        if (isLoggedIn) {
          return NextResponse.json ({error: "u alrdy logged in"}, {status: 403});
        }
        
        const data = await req.formData ();
        const file: File | null = data.get ('image') as unknown as File;

        if (!file){
            return NextResponse.json ({success:false})
        }

        const user_name = data.get ('name');
        const user_email = data.get ('email');
        const user_phone = data.get ('phone');
        const user_username = data.get ('username');
        const user_password = data.get ('password');

        if (isDataValid (user_name as string, user_email as string, user_phone as string, user_username as string, user_password as string)) {
            const noDupes = await isNoDuplicate (user_username as string, user_email as string);
            if (noDupes) {
                const userId = await dbInsertUserInfo (user_name as string, decrypt (user_email as string) as string, decrypt (user_phone as string) as string, 'defaultDP.jpg');
                const cryptedPassword = await hashSalt (decrypt (user_password as string));

                if (userId === -1)
                    throw new Error ("Error inserting user check error above");

                const affectedRows = await dbInsertUserCredentials (userId, user_username as string, cryptedPassword as string);

                if (affectedRows !== 1)
                    throw new Error ("Error in inserting user creds, affected rows: " + affectedRows.toString ());

                if (file !== null && typeof file !== "string") {
                    const maxImageSize = parseInt (process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE!);

                    if (!file.type.startsWith ("image/") || file.size >= maxImageSize) {
                        throw new Error ("File is either too big or not an image");
                    }
                    else {
                        const bytes = await file.arrayBuffer ();
                        const buffer = Buffer.from (bytes);
                        const parts = file.name.split ('.');
                        const fileName = "profile-" + userId.toString () + "." + parts[parts.length - 1];
                        const path = join ('public', 'user-images', fileName);
                        await writeFile (path, buffer);
                        const updateSuccess = await dbUpdateProfilePhoto (userId, fileName);
                        
                        if (updateSuccess === -1)
                            throw new Error ("Error in updating profile photo");
                    }
                }
            }
            else {
                console.error ("error in duplicate finding");
                return NextResponse.json ({error: "hmm sussy register found"},{status: 400});
            }
        } else {
            console.error ("regex failed handle sussy login");
            return NextResponse.json ({error: "hmm sussy register data angy"},{status: 400});
        }
    } catch(error) {
        console.error ("Error authRegisterPOST: ", error);
        return NextResponse.json ({error: "hmmm sumn went wrong"},{status: 400});
    }

    return NextResponse.json ({message: "good job register"}, {status: 200})
}