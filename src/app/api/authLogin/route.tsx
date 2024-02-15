import { NextResponse } from 'next/server';
import { decrypt } from '@/components/utility/functions/encryptFunctions';
import { validatePassword, validateUsername } from '@/components/utility/regex/regex';
import { insertSessionActivityPOST } from '@/components/utility/functions/cookieFunctions';
import { authLogin, hashSalt } from '@/components/utility/functions/passwordFunctions';
import { updateUserSession } from '@/utils/dbUpdateActions';
import { checkIfLoggedInReq } from '@/components/utility/functions/authFunctions';


function isDataValid (username: string, password: string) {
  const usernameDecrypted = decrypt (username);
  const passwordDecrypted = decrypt (password);

  return (validateUsername (usernameDecrypted) && validatePassword (passwordDecrypted))
}

export async function POST (req: any) {
  try {
    const body = await req.json ();
    const isLoggedIn = await checkIfLoggedInReq (req);
    await insertSessionActivityPOST (req);

    if (isLoggedIn) {
      return NextResponse.json ({message: "u alrdy logged in"}, {status: 403})
    }

    if (isDataValid (body.username, body.password)) {
      const usernameDecrypted = decrypt (body.username);
      const passwordDecrypted = decrypt (body.password);
      const foundUser = await authLogin (usernameDecrypted, passwordDecrypted);

      if (foundUser) {  
        console.log ("good now handle successful login");
        const updateSuccess = await updateUserSession (req.cookies.get ('session')!.value, usernameDecrypted);
        if (updateSuccess !== -1)
          return NextResponse.json ({message: "nc login"}, {status: 200})
        else
          throw new Error ("Error while updaitng user session user so still not logged in");
      } else {
        console.log ("data is valid but cant find user sadge");
        return NextResponse.json ({message: "hmmm sumn went wrong in login"}, {status: 400})
      }
    }
    else {
      console.log ("regex failed handle sussy login");
      return NextResponse.json ({error: "hmm sussy login data angy"}, {status: 400});
    }
  } catch (error) {
    console.log (error);
    console.log ("idk wat to tell you about this one");
    return NextResponse.json ({error: "hmmm sumn went wrong in login"}, {status: 400});
  }
}