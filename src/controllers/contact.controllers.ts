import { Request, Response } from "express";
import { verifyEmail } from "../middlewares/contact.middlewares";
import { sendingContactMail, SaveContact } from "../services/contact.services";
import contactSchema from "../schema/contact.schema";

enum status {
    ok = 200,
    badinput = 400,
    error = 500
}

const ContactFormController = async (req: Request, res: Response) => {
    try {
        // 1. Validate Input Structure
        const result = contactSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ errors: result.error.format() });
        }

        const datas = result.data; // Now typed and safe

        // 2. Deep Email Validation
        const isRealEmail = await verifyEmail(datas.email);
        if (!isRealEmail) {
            return res.status(400).json({ message: "The email address does not exist." });
        }

        // 3. Parallel Execution (Optional Optimization)
        // You could save to DB and send mail at the same time
        const [mailSent, dbSaved] = await Promise.all([
            sendingContactMail(datas),
            SaveContact(datas)
        ]);

        if (!mailSent || !dbSaved) {
            return res.status(500).json({ message: "Partial success, but encountered an internal error." });
        }

        return res.status(200).json({ message: "Inquiry received successfully." });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export default ContactFormController