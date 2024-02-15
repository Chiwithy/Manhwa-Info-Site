import { NextRequest, NextResponse } from "next/server";
import { generateSessionToken } from "./components/utility/functions/cookieFunctions";
import { insertActivity } from "./utils/dbInsertActions";
import { connect } from "./utils/db";
import mysql, { Connection } from 'mysql2/promise';

export async function middleware (req: NextRequest) {
    const cookie = req.cookies.get ('session');
    const res = NextResponse.next ();
    if (cookie === undefined) {
        res.cookies.set ('session', generateSessionToken ());
    }

    res.cookies.set ('reqPath', req.nextUrl.pathname);
    return res;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}