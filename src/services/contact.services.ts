import { pool } from '../config/db'
import transport from '../config/mailer';
import { GMAIL_ID } from '../config/config';
import { getBusinessNotificationHTML, getUserAcknowledgmentHTML } from '../templates/email.templates';

interface ContactMailData {
    name: string;
    email: string;
    phone: string; // Added phone
    message: string;
}

export const sendingContactMail = async (datas: ContactMailData): Promise<boolean> => {
    const businessEmail = "manifestedu11@gmail.com";
    const websiteUrl = "https://www.manifestedu.com.np";
    const logoUrl = "https://www.manifestedu.com.np/logo.jpg"; // Host your logo online

    try {
        // 1. Send Confirmation to User
        const userMailPromise = transport.sendMail({
            from: `"Manifest Education Consultancy" <${GMAIL_ID}>`,
            to: datas.email,
            subject: "We've Received Your Inquiry - Manifest Education Consultancy",
            html: getUserAcknowledgmentHTML(datas, websiteUrl, logoUrl)
        });

        // 2. Send Lead Notification to Consultancy
        const businessMailPromise = transport.sendMail({
            from: `"Manifest Web Portal" <${GMAIL_ID}>`,
            to: businessEmail,
            subject: `New Inquiry: ${datas.name}`,
            html: getBusinessNotificationHTML(datas, logoUrl)
        });

        // Run both concurrently for performance
        await Promise.all([userMailPromise, businessMailPromise]);

        return true;
    } catch (error) {
        console.error("Failed to send emails:", error);
        return false;
    }
};


export const SaveContact = async (datas: ContactMailData): Promise<boolean> => {
    try {
        // query to insert the data into the table/database table
        const query = `INSERT INTO contacts (name, email, phone, message) VALUES ($1, $2, $3, $4)`;
        // values to store // this is done to prevent from SQLInjection.
        const values = [datas.name, datas.email, datas.phone, datas.message]
        // main query that takes to the database
        const response = await pool.query(query, values)
        console.log("Data hase been inserted into the table");
        return true
    } catch (error) {
        console.error("Error while saving the contact form in database", error);
        return false
    }
}
