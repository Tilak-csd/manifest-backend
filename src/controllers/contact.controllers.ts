import { Request, Response } from "express";
import { verifyEmail } from "../middlewares/contact.middlewares";
import { sendingContactMail, SaveContact } from "../services/contact.services";

enum status {
    ok = 200,
    notfound = 404,
    badinput = 500,
    error = 400
}

const ContactFormController = async (req : Request, res : Response)=>{
    try {
        const datas: any = req.body
        if (!datas.name || !datas.email || !datas.message) {
            return res.status(status.badinput).json({ message: "Please enter the all data" })
        }
        // email verification
        const emailCheck = await verifyEmail(datas.email)
        if (!emailCheck) {
            return res.status(status.error).json({ message: "Not a Valid Email" })
        }
        // sending the Mail for the Confirmation about the reservation. 
        const response = await sendingContactMail(datas)
        if (!response) {
            return res.status(status.error).json({ message: "Failed to send the message" })
        }
        // Saving the user entered data into a database for future analysis.
        const db_response = await SaveContact(datas)
        if (!db_response) {
            return res.status(status.error).json({ message: "Faced Error while storing data in database." })
        }
        res.status(status.ok).json({ message: "Successfully Mail sended." })

    } catch (error) {
        res.status(status.notfound).json({ message: "Not Found" })
    }
    
}

export default ContactFormController