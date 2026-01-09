import validate from 'deep-email-validator';

export const verifyEmail = async (email: string) => {
    const result = await validate({
        email: email,
        validateSMTP: false, // You can set this to false to see if SMTP is the culprit
    });
    
    // console.log(result); // Check the "validators" object here
    return result.valid;
}