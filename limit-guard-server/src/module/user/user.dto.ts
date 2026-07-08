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

export const updateProfileDtoSchema = z.preprocess(
  (value) => value ?? {},
  z.object({
    fullname: z.string().optional(),
    profile_image_url: z.string().optional(),
  })
  .strict()
  .refine(
    (data) =>
      data.fullname !== undefined ||
      data.profile_image_url !== undefined,
    {
      message: "At least one field is required to update profile.",
    }
  )
);


export type SignupDto = z.infer<typeof signupDtoSchema>
export type LoginDto = z.infer<typeof loginDtoSchema>
export type updateProfileDto = z.infer<typeof updateProfileDtoSchema>