import { Category } from "./category";
import { UserReview } from "./user-review";

export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    category: Category;
    reviews: UserReview[];
}

export type CartProduct = Pick<Product, 'id' | 'name' | 'price' | 'imageUrl' | 'inStock'>;