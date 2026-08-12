export type orderItem = {
    product: string;
    name: string;
    priceAtPurchase: number;
    image: string;
    quantity: number;
    itemTotal: number;
    id: string;
    //
    status: string;
    updatedTime: Date;
}

export type Order = {
    _id: string;
    userId: string;
    items: [orderItem];
    totalAmount: number;
    status: string
};