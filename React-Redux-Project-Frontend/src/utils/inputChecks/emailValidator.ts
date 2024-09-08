
const EmailValidator = (email: string) => {
    // Basic email format check
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email.');
        return false;
    } else {
        return true;
    }
};

export default EmailValidator