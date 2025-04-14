import { z } from 'zod';

export const ProductSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    image: z.custom<FileList>().refine((files) => files instanceof FileList && files.length > 0, "Image is required")
})

export const EditProductSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number()
})