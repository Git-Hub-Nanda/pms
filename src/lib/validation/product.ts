import { z } from 'zod';
const url = z
  .string()
  .url('Enter a valid HTTPS image URL')
  .refine((value) => value.startsWith('https://'), 'Image URL must use HTTPS');
export const productSchema = z.object({
  title: z.string().trim().min(2).max(120),
  brand: z.string().trim().min(2).max(80),
  category: z.string().min(1),
  description: z.string().trim().min(10).max(1_000),
  price: z.coerce.number().positive().max(1_000_000),
  stock: z.coerce.number().int().min(0).max(1_000_000),
  discountPercentage: z.coerce.number().min(0).max(100),
  rating: z.coerce.number().min(0).max(5),
  thumbnail: url,
  image: url,
});
export type ProductInput = z.infer<typeof productSchema>;
