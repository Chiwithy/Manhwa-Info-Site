import AdminLayout from '@/components/AdminElements/AdminLayout/AdminLayout';
import ManhwaAdminPanel from '@/components/AdminPanels/ManhwaAdminPanel/ManhwaAdminPanel';
import { checkIfManhwaAdmin } from '@/components/utility/functions/authFunctions';
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextRequest } from 'next/server';
import React from 'react'

const page = async (req: NextRequest) => {
    const cookieStore = cookies ();
    const sessionToken = cookieStore.get ('session')!.value;

    insertSessionActivity (cookieStore);

    const isManhwaAdmin = await checkIfManhwaAdmin (sessionToken);

    if (isManhwaAdmin)
        return (
            <AdminLayout>
                <ManhwaAdminPanel/>
            </AdminLayout>
        );
    else
        return notFound ();
  return (
    <div>page</div>
  )
}

export default page