import CryptoJS from "crypto-js";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { dbInsertActivity, dbInsertUserSession } from "@/utils/dbInsertActions";
import { NextRequest } from "next/server";
import { dbCheckIfTokenExists } from "@/utils/dbCheckActions";
import { dbGetUserIdSession } from "@/utils/dbSelectActions";

export function generateSessionToken () {
    let randomBytes = CryptoJS.lib.WordArray.random (16);
    return randomBytes.toString (CryptoJS.enc.Hex);
}

export async function insertSessionActivity (cookieStore: ReadonlyRequestCookies) {
    const tokenExists = await dbCheckIfTokenExists (cookieStore.get ('session')!.value);
    const userId = await dbGetUserIdSession (cookieStore.get ('session')!.value);
    if (!tokenExists)
        await dbInsertUserSession (cookieStore.get ('session')!.value);

    await dbInsertActivity (cookieStore.get ('session')!.value, userId, cookieStore.get ('reqPath')!.value);
}

export async function insertSessionActivityPOST (req: NextRequest) {
    const url = req.url.replace ("http://localhost:3000", "");
    const userId = await dbGetUserIdSession (req.cookies.get ('session')!.value);
    
    await dbInsertActivity (req.cookies.get ('session')!.value, userId, url);
}