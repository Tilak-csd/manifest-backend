import { Router } from "express";
import ContactFormController from "../controllers/contact.controllers";

const route = Router()

route.post('/contactForm', ContactFormController)

export default route