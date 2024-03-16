import { dbCheckIfManhwaAdmin, dbCheckIfTokenLoggedIn, dbCheckIfUserAdmin } from "@/utils/dbCheckActions";

export async function checkIfLoggedIn (sessionToken: string) {
    try {
        return await dbCheckIfTokenLoggedIn (sessionToken);
    } catch (error) {
        console.error ("Error in checkIfLoggedIn: ", error);
        return false;
    }
}

export async function checkIfAdmin (sessionToken: string) {
    try {
        const [isUserAdmin, isManhwaAdmin] = await Promise.all ([checkIfUserAdmin (sessionToken), checkIfManhwaAdmin (sessionToken)]);
        return (isUserAdmin || isManhwaAdmin);
    } catch (error) {
        console.error ("Error in checkIfAdmin: ", error);
        return false;
    }
}

export async function checkIfUserAdmin (sessionToken: string) {
    try {
        return await dbCheckIfUserAdmin (sessionToken);
    } catch (error) {
        console.error ("Error in checking user admin");
    }
}

export async function checkIfManhwaAdmin (sessionToken: string) {
    try {
        return await dbCheckIfManhwaAdmin (sessionToken);
    } catch (error) {
        console.error ("Error in checking manhwa admin");
    }
}