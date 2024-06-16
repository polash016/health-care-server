import {z} from 'zod'

const createAdmin = z.object({
    password: z.string({required_error: 'Password is required'}).min(6),
    admin: z.object({
      name: z.string({required_error: 'Name is required'}),
      email: z.string({required_error: 'Email is required'}).email(),
      contactNumber: z.string({required_error: 'Contact Number is required'}),
    })
})

export const userValidation = {
    createAdmin
}