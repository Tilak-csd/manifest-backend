// Load dotenv ONLY in development
if (process.env.NODE_ENV !== 'production') {
   import('dotenv/config')
}

const PORT = process.env.PORT || 5000
const APP_PASSWORD = process.env.APP_PASSWORD
const GMAIL_ID = process.env.GMAIL_ID

if (!APP_PASSWORD || !GMAIL_ID) {
  throw new Error('Missing required environment variables')
}

export { PORT, APP_PASSWORD, GMAIL_ID }