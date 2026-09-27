import { loginSchema } from '@/lib/validation/auth';
import { productSchema } from '@/lib/validation/product';
describe('validation schemas', () => {
  it('rejects malformed login data', () =>
    expect(loginSchema.safeParse({ email: 'not-an-email', password: 'short' }).success).toBe(false));
  it('accepts a valid product', () =>
    expect(
      productSchema.safeParse({
        title: 'Headphones',
        brand: 'Acme',
        category: 'audio',
        description: 'High quality wireless headphones',
        price: 99,
        stock: 10,
        discountPercentage: 0,
        rating: 4.5,
        thumbnail: 'https://example.com/thumb.jpg',
        image: 'https://example.com/image.jpg',
      }).success,
    ).toBe(true));
});
