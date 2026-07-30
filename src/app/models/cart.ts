import { CartProduct } from "./product";


export type CartItem = {
    _id?: number,
    product: CartProduct,
    quantity: number
}