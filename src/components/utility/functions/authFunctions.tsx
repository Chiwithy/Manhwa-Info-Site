import { checkIfTokenAdmin, checkIfTokenLoggedIn } from "@/utils/dbCheckActions";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

export async function checkIfLoggedInReq (req: NextRequest): Promise<boolean> {
    try {
        const sessionToken = req.cookies.get ('session')!.value;
        return await checkIfTokenLoggedIn (req.cookies.get ('session')!.value);
    }
    catch (error) {
        console.error ("Error in checkIfLoggedIn: ", error);
        return false;
    }
}

export async function checkIfLoggedInCookies (cookieStore: ReadonlyRequestCookies) {
    try {
        return await checkIfTokenLoggedIn (cookieStore.get ('session')!.value);
    } catch (error) {
        console.error ("Error in checkIfLoggedInCookies: ", error);
        return false;
    }
}

export async function checkIfAdminReq (req: NextRequest): Promise<boolean> {
    try {
        const isLoggedIn = await checkIfLoggedInReq (req);
        if (isLoggedIn)
            return await checkIfTokenAdmin (req.cookies.get ('session')!.value);

        return false;
    } catch (error) {
        console.error ("Erorr in checkIfAdmin: ", error);
        return false;
    }
}

export async function checkIfAdminCookies (cookieStore: ReadonlyRequestCookies) {
    try {
        const isLoggedIn = await checkIfLoggedInCookies (cookieStore);
        if (isLoggedIn)
            return await checkIfTokenAdmin (cookieStore.get ('session')!.value);

        return false;
    } catch (error) {
        console.error ("Error in checkIfAdminCookies: ", error);
        return false;
    }
}
