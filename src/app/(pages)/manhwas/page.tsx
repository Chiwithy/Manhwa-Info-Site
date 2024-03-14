import { insertSessionActivity } from '@/components/utility/functions/cookieFunctions';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import React from 'react'

const page = async (req: NextRequest) => {
    insertSessionActivity (cookies ());
    return (
        <div>i want to mwa~nhwas you &lt;3_&lt;3</div>
    )
}

export default page