import AdminLayout from '@/components/AdminElements/AdminLayout/AdminLayout';
import UserAdminPanel from '@/components/AdminPanels/UserAdminPanel/UserAdminPanel';
import Navbar from '@/components/NavBar/NavBar';
import { checkIfUserAdmin } from '@/components/utility/functions/authFunctions';
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';
import React from 'react'

const page = async (req: NextRequest) => {
    const cookieStore = cookies ();
    const sessionToken = cookieStore.get ('session')!.value;

    insertSessionActivity (cookieStore);
    
    const isUserAdmin = await checkIfUserAdmin (sessionToken);
    
    if (isUserAdmin)
        return (
            <AdminLayout>
                <UserAdminPanel/>
            </AdminLayout>
        );
    else
        return notFound ();
}

export default page