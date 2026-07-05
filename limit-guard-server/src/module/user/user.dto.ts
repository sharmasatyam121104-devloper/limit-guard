import { z } from 'zod'

export const signupDtoSchema = z.object({
    fullname: z.string().min(1, "fullname is required."),
    email: z.email("Enter a valid email."),
    password: z.string().min(6, "Password is required and its length will ateleast 6 char")
}).strict()

export const loginDtoSchema = z.object({
    email: z.email("Enter a valid email"),
    password: z.string().min(6, "Password is required and its length will ateleast 6 char")
}).strict()


export type SignupDto = z.infer<typeof signupDtoSchema>
export type LoginDto = z.infer<typeof loginDtoSchema>