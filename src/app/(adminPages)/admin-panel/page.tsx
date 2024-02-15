import AdminPanel from '@/components/AdminPanel/AdminPanel';
import { checkIfAdminCookies } from '@/components/utility/functions/authFunctions';
import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react'

const page = async (req: NextRequest) => {
    insertSessionActivity (cookies ());
    const isAdmin = await checkIfAdminCookies (cookies ());
    
    if (isAdmin)
        return ( <AdminPanel/> );
    else {
        return notFound ();
    }
}

export default page