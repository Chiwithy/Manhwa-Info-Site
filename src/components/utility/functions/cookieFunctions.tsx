import CryptoJS from "crypto-js";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { insertActivity, insertUserSession } from "@/utils/dbInsertActions";
import { NextRequest } from "next/server";
import { checkIfTokenExists } from "@/utils/dbCheckActions";
import { getUserIdSession } from "@/utils/dbSelectActions";

export function generateSessionToken () {
    let randomBytes = CryptoJS.lib.WordArray.random (16);
    return randomBytes.toString (CryptoJS.enc.Hex);
}

export async function insertSessionActivity (cookieStore: ReadonlyRequestCookies) {
    const tokenExists = await checkIfTokenExists (cookieStore.get ('session')!.value);
    const userId = await getUserIdSession (cookieStore.get ('session')!.value);
    if (!tokenExists)
        await insertUserSession (cookieStore.get ('session')!.value);

    await insertActivity (cookieStore.get ('session')!.value, userId, cookieStore.get ('reqPath')!.value);
}

export async function insertSessionActivityPOST (req: NextRequest) {
    const url = req.url.replace ("http://localhost:3000", "");
    const userId = await getUserIdSession (req.cookies.get ('session')!.value);
    
    await insertActivity (req.cookies.get ('session')!.value, userId, url);
}