import CryptoJS from 'crypto-js';

export function encrypt (data: string) {
    try {
        return CryptoJS.AES.encrypt (data, process.env.NEXT_PUBLIC_PASS!).toString ();
    } catch (error) {
        throw new Error ("SOMETHING WENT WRONG in encrypt");
    }
    
}

export function decrypt (data: string) {
    try {
        return CryptoJS.AES.decrypt (data, process.env.NEXT_PUBLIC_PASS!).toString (CryptoJS.enc.Utf8);
    } catch (error) {
        throw new Error ("SOMETHING WENT WRONG in decrypt");
    }
}