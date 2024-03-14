import { checkIfLoggedInReq } from "@/components/utility/functions/authFunctions";
import { insertSessionActivityPOST } from "@/components/utility/functions/cookieFunctions";
import { logOutToken } from "@/utils/dbUpdateActions";
import { NextResponse } from "next/server";

export async function POST (req: any) {
    try {
        const isLoggedIn = checkIfLoggedInReq (req);
        insertSessionActivityPOST (req);
        if (!isLoggedIn)
            return NextResponse.json ({error: "U ARE NOT LOGGED IN EVEN"}, {status: 403})
        await logOutToken (req);

        return NextResponse.json ({message: "logout successful yippie"}, {status: 200})

    } catch (error) {
        console.error ("Error in logout POST: ", error);
        return NextResponse.json ({error: "logout POST bad nooo don't logout u're so sexy aha"}, {status: 400});
    }

}