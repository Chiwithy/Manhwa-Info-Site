export const nameRegex: RegExp = /^[a-zA-Z ,.'\-]{1,200}$/;
export const emailRegex: RegExp = /^(?=.{1,200}@)((?:[A-Za-z0-9!#\$%&'\*\+\-/=\?\^_`\{\|\}~]+|"(?:\\"|\\|[A-Za-z0-9\.!#\$%&'\*\+\-/=\?\^_`\{\|\}~ \(\),:;<>@\[\]\.])+")(?:\.(?:[A-Za-z0-9!#\$%&'\*\+\-/=\?\^_`\{\|\}~]+|"(?:\\"|\\|[A-Za-z0-9\.!#\$%&'\*\+\-/=\?\^_`\{\|\}~ \(\),:;<>@\[\]\.])+"))*)@(?=.{1,255}\.)((?:[A-Za-z0-9]+(?:(?:[A-Za-z0-9\-]*[A-Za-z0-9])?)\.)+[A-Za-z]{2,})|(((0|[1-9A-Fa-f][0-9A-Fa-f]{0,3}):){0,6}(0|)])$/;
export const phoneRegex: RegExp = /^\+63\d{3}-\d{3}-\d{4}$/;
export const usernameRegex: RegExp = /^(?=[a-zA-Z0-9._]{6,64}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
export const passwordRegex: RegExp= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

export function validateName (name: string) { return name.trim () && name.trim ().length > 0 && nameRegex.test (name); }
export function validateEmail (email: string) { return email.trim () && email.trim ().length > 0 && emailRegex.test (email); }
export function validatePhone (phone: string) { return phone.trim () && phone.trim ().length > 0 && phoneRegex.test (phone); }
export function validateUsername (username: string) { return username.trim () && username.trim ().length > 0 && usernameRegex.test (username); }
export function validatePassword (password: string) { return password.trim () && password.trim ().length > 0 && passwordRegex.test (password); }

// email regex: shoutout to: https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression