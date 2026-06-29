import { computed, inject } from "@angular/core";
import { Product } from "./app/models/product";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import { produce } from "immer";
import { Toaster } from "./app/services/toaster";
import { CartItem } from "./app/models/cart";


export type EcommerceState = {
    products: Product[];
    category: string;
    wishListItems: Product[];
    cartItems: CartItem[];
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root'
    },
    withState({
        products: [
            {
              id: "1",
              name: "Minimalist Desk Lamp",
              description: "A sleek, energy-efficient LED lamp perfect for modern workspaces.",
              price: 45.99,
              imageUrl: "https://images.unsplash.com/photo-1507473885769-e6bd89cdc243?w=800&q=80",
              rating: 4.8,
              reviewCount: 120,
              inStock: true,
              category: "Home"
            },
            {
              id: "2",
              name: "Ergonomic Office Chair",
              description: "High-back chair with lumbar support and adjustable armrests.",
              price: 299.00,
              imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
              rating: 4.5,
              reviewCount: 85,
              inStock: true,
              category: "Home"
            },
            {
              id: "3",
              name: "Wireless Noise-Canceling Headphones",
              description: "Experience crystal clear sound with industry-leading noise cancellation.",
              price: 349.50,
              imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
              rating: 4.9,
              reviewCount: 450,
              inStock: true,
              category: "Electronics"
            },
            {
              id: "4",
              name: "Mechanical Keyboard",
              description: "Tactile switches with customizable RGB lighting for the ultimate gaming experience.",
              price: 129.99,
              imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
              rating: 4.7,
              reviewCount: 210,
              inStock: false,
              category: "Electronics"
            },
            {
              id: "5",
              name: "Organic Cotton T-Shirt",
              description: "Soft, breathable, and sustainably sourced cotton t-shirt.",
              price: 25.00,
              imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
              rating: 4.2,
              reviewCount: 300,
              inStock: true,
              category: "clothing"
            },
            {
              id: "6",
              name: "Ceramic Coffee Mug",
              description: "Handcrafted 12oz ceramic mug, dishwasher and microwave safe.",
              price: 18.50,
              imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80",
              rating: 4.6,
              reviewCount: 95,
              inStock: true,
              category: "Kitchen"
            },
            {
              id: "7",
              name: "Running Shoes",
              description: "Lightweight, cushioned sneakers designed for maximum comfort on the track.",
              price: 110.00,
              imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
              rating: 4.4,
              reviewCount: 175,
              inStock: true,
              category: "clothing"
            },
            {
              id: "8",
              name: "Smart Watch Series 5",
              description: "Track your health, fitness, and notifications with ease.",
              price: 399.99,
              imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
              rating: 4.8,
              reviewCount: 520,
              inStock: true,
              category: "Electronics"
            },
            {
              id: "9",
              name: "Leather Journal",
              description: "A premium refillable leather journal with thick, cream-colored paper.",
              price: 35.00,
              imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
              rating: 4.9,
              reviewCount: 60,
              inStock: true,
              category: "home"
            },
            {
              id: "10",
              name: "Canvas Backpack",
              description: "Durable water-resistant backpack with a dedicated 15-inch laptop sleeve.",
              price: 75.00,
              imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
              rating: 4.3,
              reviewCount: 140,
              inStock: false,
              category: "Accessories"
            },{
              id: "11",
              name: "Noise-Canceling Earbuds",
              description: "Compact wireless earbuds with active noise cancellation and 24-hour battery life.",
              price: 199.00,
              imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
              rating: 4.6,
              reviewCount: 312,
              inStock: true,
              category: "Electronics"
            },
            {
              id: "12",
              name: "Stainless Steel Water Bottle",
              description: "Vacuum insulated, keeps drinks cold for 24 hours or hot for 12.",
              price: 29.99,
              imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
              rating: 4.7,
              reviewCount: 890,
              inStock: true,
              category: "home"
            },
            {
              id: "13",
              name: "Yoga Mat",
              description: "Non-slip, eco-friendly extra-thick yoga mat for comfort and stability.",
              price: 42.00,
              imageUrl: "https://images.unsplash.com/photo-1593810037583-0524495c2560?w=800&q=80",
              rating: 4.5,
              reviewCount: 245,
              inStock: true,
              category: "home"
            },
            {
              id: "14",
              name: "Electric Kettle",
              description: "Fast-boil technology with automatic shut-off and temperature control.",
              price: 55.00,
              imageUrl: "https://images.unsplash.com/photo-1583182332473-b375a8986c73?w=800&q=80",
              rating: 4.4,
              reviewCount: 156,
              inStock: true,
              category: "home"
            },
            {
              id: "15",
              name: "Gaming Mouse",
              description: "High-precision optical sensor with 12 programmable buttons.",
              price: 89.99,
              imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91051a365?w=800&q=80",
              rating: 4.8,
              reviewCount: 430,
              inStock: true,
              category: "Electronics"
            },
            {
              id: "16",
              name: "Bluetooth Speaker",
              description: "Portable waterproof speaker with deep bass and 360-degree sound.",
              price: 120.00,
              imageUrl: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc3?w=800&q=80",
              rating: 4.7,
              reviewCount: 670,
              inStock: false,
              category: "Electronics"
            },
            {
              id: "17",
              name: "Desk Organizer",
              description: "Multi-compartment bamboo desk organizer to keep your workspace clutter-free.",
              price: 32.50,
              imageUrl: "https://images.unsplash.com/photo-1601042879364-61eba594129e?w=800&q=80",
              rating: 4.3,
              reviewCount: 98,
              inStock: true,
              category: "Home"
            },
            {
              id: "18",
              name: "Table Lamp",
              description: "Industrial style metal lamp with an adjustable swing arm.",
              price: 65.00,
              imageUrl: "https://images.unsplash.com/photo-1534073828943-f801091abb18?w=800&q=80",
              rating: 4.5,
              reviewCount: 112,
              inStock: true,
              category: "home"
            },
            {
              id: "19",
              name: "Polarized Sunglasses",
              description: "Classic frame design with UV400 protection lenses.",
              price: 49.99,
              imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
              rating: 4.6,
              reviewCount: 340,
              inStock: true,
              category: "Accessories"
            },
            {
              id: "20",
              name: "Running Belt",
              description: "Lightweight and bounce-free belt for phones, keys, and water bottles.",
              price: 22.00,
              imageUrl: "https://images.unsplash.com/photo-1557163861-55079a4ec823?w=800&q=80",
              rating: 4.2,
              reviewCount: 75,
              inStock: true,
              category: "home"
            }
          ],
        category: 'all',
        wishListItems: [],
        cartItems: []
    } as EcommerceState),
    withComputed(({ category, products, wishListItems, cartItems }) => ({
        filteredProducts: computed(() => {
            if(category() === 'all') return products();
            return products().filter(p => p.category.toLowerCase() === category().toLowerCase())
        }),
        wishListCount: computed(() => wishListItems().length),
        cartCount: computed(() => cartItems().length)
    })),
    withMethods((store, toaster = inject(Toaster)) => ({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category });
        }),
        addToWishList: (product: Product)=>{
            const updatedWishListItems = produce( store.wishListItems(), (draft:any) => {
                if( !draft.find((p:any) => p.id === product.id)){
                    draft.push(product);
                }
            });
            patchState(store, {wishListItems: updatedWishListItems});
            toaster.success("Product added to wishlist")
        },
        addToCart: (product: Product, quantity = 1)=>{
          const existingItemIndex = store.cartItems().findIndex(i => i.product.id === product.id);
          const updatedCartItems = produce(store.cartItems(), (draft) => {
            if(existingItemIndex !== -1){
              draft[existingItemIndex].quantity += quantity;
              return;
            }

            draft.push({
              product, quantity
            })
          });

          patchState(store, {cartItems: updatedCartItems});
          toaster.success(existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart')
        },
        removeFromWishList: (product: Product)=>{
            patchState(store, {
                wishListItems: store.wishListItems().filter((p) => p.id !== product.id),
            });
            toaster.success("Product removed from wishlist");
        },
        clearWishList: () => {
          patchState(store, { wishListItems: [] })
        },
        setItemQuantity(params: { productId: string, quantity: number}) {
          const index = store.cartItems().findIndex(c => c.product.id === params.productId)
          const updated = produce(store.cartItems(), (draft) => {
            draft[index].quantity = params.quantity
          });

          patchState(store, {cartItems: updated});
        },
        addAllWishListToCart: () => {
          const updatedCartItems = produce(store.cartItems(), (draft) => {
            store.wishListItems().forEach(p => {
              if(!draft.find(c => c.product.id === p.id)) {
                draft.push({ product: p, quantity: 1});
              }
            })
          })
          patchState(store, { cartItems: updatedCartItems, wishListItems: []});
        },
        moveToWishList: (product: Product) => {
          const updatedCartItems = store.cartItems().filter((p => p.product.id !== product.id))
          const updatedWishListItems = produce(store.wishListItems(), (draft) => {
            if(!draft.find(p => p.id === product.id)){
              draft.push(product)
            }
          })
          patchState(store, { cartItems: updatedCartItems , wishListItems: updatedWishListItems});
        },

        removeFromCart: (product: Product) => {
          patchState(store, {
            cartItems: store.cartItems().filter((c) => c.product.id !== product.id),

          })
        }
    }))
)