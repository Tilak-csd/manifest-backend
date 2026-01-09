import nodemailer from 'nodemailer';
import 'dotenv/config'

const transport = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.GMAIL_ID,
        pass : process.env.APP_PASSWORD
    }
});
export default transport