import {ParseStatus, z}  from 'zod';

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
})

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})

export const CreateblogInput = z.object({
    title: z.string(),
    content: z.string(),
    thumbnail: z.string().optional(),
})

export const UpdateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    thumbnail: z.string().optional(),
})

//type inference
export type SignupInputType = z.infer<typeof signupInput>
export type SigninInputType = z.infer<typeof signinInput>
export type CreateBlogInputType = z.infer<typeof CreateblogInput>
export type UpdateBlogInputType = z.infer<typeof UpdateBlogInput>
