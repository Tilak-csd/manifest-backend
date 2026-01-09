import express from 'express';
import cors from 'cors'
const app = express()

// Routes Imports
import contactForm from './routes/contact.routes'

app.use(cors())

app.use('/api/v1', contactForm)



export default app