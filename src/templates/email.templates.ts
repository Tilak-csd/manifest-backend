export const getBusinessNotificationHTML = (datas : any, logoUrl : String) => `
<div style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #ed1c24; border-bottom: 2px solid #004a99; padding-bottom: 10px;">New Inquiry Received</h2>
    <table cellpadding="10" style="width: 100%; border-collapse: collapse;">
        <tr style="background: #f4f4f4;">
            <td style="width: 120px; font-weight: bold;">Full Name:</td>
            <td>${datas.name}</td>
        </tr>
        <tr>
            <td style="font-weight: bold;">Email:</td>
            <td><a href="mailto:${datas.email}">${datas.email}</a></td>
        </tr>
        <tr style="background: #f4f4f4;">
            <td style="font-weight: bold;">Phone:</td>
            <td>${datas.phone}</td>
        </tr>
        <tr>
            <td style="font-weight: bold; vertical-align: top;">Message:</td>
            <td>${datas.message}</td>
        </tr>
    </table>
    <p style="margin-top: 20px; font-size: 12px; color: #888;">This email was generated automatically from the website contact form.</p>
</div>`;

export const getUserAcknowledgmentHTML = (datas: any, websiteUrl:string, logoUrl:string) => `
<div style="background-color: #f4f7f9; padding: 20px; font-family: 'Helvetica', Arial, sans-serif;">
    <table width="600" align="center" style="background: #ffffff; border-radius: 8px; overflow: hidden; border-top: 5px solid #004a99;">
        <tr>
            <td style="padding: 30px; text-align: center;">
                <img src="${logoUrl}" alt="Manifest Logo" width="180" style="margin-bottom: 20px;">
                <h2 style="color: #004a99; margin: 0;">Thank You for Reaching Out!</h2>
            </td>
        </tr>
        <tr>
            <td style="padding: 0 40px 30px 40px; color: #333; line-height: 1.6;">
                <p>Dear <strong>${datas.name}</strong>,</p>
                <p>Thank you for contacting <strong>Manifest Education Consultancy</strong>. We have received your inquiry regarding your educational journey.</p>
                <p>One of our expert counselors is reviewing your details and will contact you within 24 hours to provide personalized guidance.</p>
                
                <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #ed1c24; margin: 20px 0;">
                    <p style="margin: 0; font-size: 14px; color: #666;"><strong>Your Message:</strong></p>
                    <p style="margin: 5px 0 0 0; font-style: italic;">"${datas.message}"</p>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="${websiteUrl}" style="background-color: #ed1c24; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Visit Our Website</a>
                </div>
            </td>
        </tr>
        <tr>
            <td style="background: #004a99; color: #ffffff; padding: 20px; text-align: center; font-size: 12px;">
                <p style="margin: 0;">Putalisadak, Kathmandu (Opposite Star Mall)</p>
                <p style="margin: 5px 0;">01-5922253 | 9851363253</p>
            </td>
        </tr>
    </table>
</div>`;