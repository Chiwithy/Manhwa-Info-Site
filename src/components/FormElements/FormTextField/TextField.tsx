"use client"

import React from 'react'
import './TextField.css'
import { nameRegex, emailRegex, phoneRegex, usernameRegex, passwordRegex } from '@/components/utility/regex/regex'

interface TextFieldProps {
    fieldType: string;
    fieldUse: string;
    withError: boolean;
}

function getFieldTitle (fieldUse: string) {
    const nameTitle = "Only accepts length of 1-200 characters";
    const phoneTitle = "Phone number must follow the format: +63XXX-XXX-XXXX";
    const usernameTitle = `Username must: \r
- Be between 6-64 in length \r
- Be limited to characters of the Latin alphabet (A-z) and/or Arabic numerals (0-9) \r
- Only special characters ._ are allowed and must be preceded and succeeded by a non-special character`
    const passwordTitle = `Password must: \r
- Be between 8-64 in length \r
- Contain at least 1 upper case character \r
- Contain at least 1 lower case character \r
- Contain at least 1 digit
- Contain at least 1 special character \r`

    if (fieldUse === 'name')
        return nameTitle;
    else if (fieldUse === 'phone')
        return phoneTitle;
    else if (fieldUse === 'username')
        return usernameTitle;
    else if (fieldUse === 'password')
        return passwordTitle;
    else return "";
}

function getRegexSource (fieldUse: string) {
    if (fieldUse === 'name')
        return nameRegex.source;
    else if (fieldUse ===  'email')
        return emailRegex.source;
    else if (fieldUse === 'phone')
        return phoneRegex.source;
    else if (fieldUse === 'username')
        return usernameRegex.source;
    else if (fieldUse === 'password')
        return passwordRegex.source;
    else return "";
}

const TextField: React.FC<TextFieldProps> = ({fieldType, fieldUse, withError}) => {
    fieldType = fieldType.toLowerCase ();
    fieldUse = fieldUse.toLowerCase ();

    if (withError) {
        const fieldTitle = getFieldTitle (fieldUse);
        const regEx  = getRegexSource (fieldUse);

        return (
            <>
                <input className='input-text-field' type={fieldType} id={fieldUse} name={fieldUse} title={fieldTitle} pattern={regEx} required/>
            </>
        )
    } else {
        return (
            <>
                <input className='input-text-field' type={fieldType} id={fieldUse} name={fieldUse} required/>
            </>
        )
    }
}

export default TextField;