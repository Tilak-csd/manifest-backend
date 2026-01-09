
import transport from '../config/mailer'
import { GMAIL_ID } from '../config/config'
import { pool } from '../config/db'


interface ContactMailData {
    name: string
    email: string
    message: string
}

export const sendingContactMail = async (datas: ContactMailData): Promise<boolean> => {
    try {
        await transport.sendMail({
            from: `"Shrestha Cafe" <${GMAIL_ID}>`,
            to: datas.email,
            subject: "Thanks for reaching out to Shrestha Cafe!",
            html: `
   <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#fdf8f5; padding:20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:15px; padding:40px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
            
            <tr>
              <td style="text-align:center;">
                <h1 style="color:#5a2d0c; margin:0; font-size: 28px;">
                  ☕ Shrestha Cafe
                </h1>
                <p style="color:#a67c52; font-size:16px; font-weight:bold; margin-top:10px; text-transform:uppercase; letter-spacing:1px;">
                  Freshly Brewed Excellence
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-top:30px;">
                <p style="font-size:18px; color:#333;">
                  Hi ${datas.name || 'Friend'}! 👋
                </p>
                
                <p style="font-size:16px; color:#555; line-height:1.6;">
                  Thank you so much for reaching out to us! We are absolutely thrilled to hear from you. ✨ 
                </p>

                <p style="font-size:16px; color:#555; line-height:1.6;">
                  Our team is already jumping on your request! We’ll be looking into the details and <strong>will get back to you very soon</strong> so we can get things moving head-on. 🚀
                </p>

                <p style="font-size:16px; color:#555; line-height:1.6;">
                  In the meantime, feel free to check out our latest brews and treats! We can't wait to serve you. 🥐☕
                </p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://shresthacafe.vercel.app/" 
                     style="background-color: #5a2d0c; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                     Explore Our Menu 📋
                  </a>
                </div>

                <p style="font-size:16px; color:#5a2d0c; line-height:1.6; margin-top: 30px; font-weight:bold;">
                  Warmly,<br>
                  The Shrestha Cafe Team 🌿
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding-top:40px; text-align:center;">
                <div style="border-top: 1px solid #eee; padding-top: 20px;">
                  <p style="font-size:12px; color:#999; margin:0;">
                    © ${new Date().getFullYear()} Shrestha Cafe. All rights reserved.
                  </p>
                  <p style="font-size:12px; color:#bbb; margin-top:5px;">
                    Making your coffee moments special. ✨
                  </p>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  `
        });

        return true
    } catch (error) {
        console.error("Failed to send thea mail ", error)
        return false
    }
}

export const SaveContact = async (datas: ContactMailData): Promise<boolean> => {
    try {
        // query to insert the data into the table/database table
        const query = `INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)`;
        // values to store // this is done to prevent from SQLInjection.
        const values = [datas.name, datas.email, datas.message]
        // main query that takes to the database
        const response = await pool.query(query, values)
        console.log("Data hase been inserted into the table");
        return true
    } catch (error) {
        console.error("Error while saving the contact form in database", error);
        return false
    }
}
