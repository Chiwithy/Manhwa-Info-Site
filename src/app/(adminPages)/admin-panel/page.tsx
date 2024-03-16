import React from 'react'
import "./admin-panel.css"
import Link from 'next/link'
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { checkIfManhwaAdmin, checkIfUserAdmin } from '@/components/utility/functions/authFunctions';
import RedirectToHome from '@/components/RedirectToHome/page';
import { notFound, redirect } from 'next/navigation';
import Navbar from '@/components/NavBar/NavBar';
import AdminLayout from '@/components/AdminElements/AdminLayout/AdminLayout';

const page = async (req: NextRequest) => {
    const cookieStore = cookies ();
    const sessionToken = cookieStore.get ('session')!.value;

    insertSessionActivity (cookieStore);

    const [isUserAdmin, isManhwaAdmin] = await Promise.all ([checkIfUserAdmin (sessionToken), checkIfManhwaAdmin (sessionToken)]);

    if (isUserAdmin && isManhwaAdmin) {
        return (
            
            <AdminLayout>
                <div className="panel-choice-container">
                <h1>Which panel would you like to access?</h1>
            
                <div className="panel-button-container">
                    <Link href="/user-admin-panel"><button className="button button-user">User Admin Panel</button></Link>
                    <Link href="/manhwa-admin-panel"><button className="button button-manhwa">Manhwa Admin Panel</button></Link>
                </div>
                </div>
            </AdminLayout>
        )
    }
    else if (isUserAdmin) {
        redirect ('/user-admin-panel');
    }
    else if (isManhwaAdmin) {
        redirect ('/manhwa-admin-panel');
    }
    else
        return notFound ();

  
}

export default page