import zod from 'zod'

const contactSchema = zod.object({
    name : zod.string().min(2),
    email : zod.email().min(5),
    phone : zod.string().min(10),
    message : zod.string()
})

export default contactSchema