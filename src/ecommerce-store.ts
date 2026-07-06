import { computed, inject } from "@angular/core";
import { Product } from "./app/models/product";
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import { produce } from "immer";
import { Toaster } from "./app/services/toaster";
import { CartItem } from "./app/models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "./app/components/sign-in-dialog/sign-in-dialog";
import { SignInParams, SignUpParams, User } from "./app/models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { Order } from "./app/models/order";
import { withStorageSync } from "@angular-architects/ngrx-toolkit";
import { AddReviewParams, UserReview } from "./app/models/user-review";


export type EcommerceState = {
    products: Product[];
    category: string;
    wishListItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
    writeReview: boolean;
    searchInput: string;
    toggleSideNav: boolean;
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
            reviewCount: 1,
            inStock: true,
            category: "Home Office",
            reviews: [
              {
                id: "r1",
                productId: "1",
                userName: "Alice Johnson",
                userImageUrl: "https://i.pravatar.cc/150?u=alice",
                rating: 5,
                title: "Perfect for my desk",
                comment: "This lamp looks amazing and provides the perfect amount of light.",
                reviewDate: new Date("2026-05-15")
              }
            ]
          },
          {
            id: "2",
            name: "Ergonomic Office Chair",
            description: "High-back chair with lumbar support.",
            price: 299.00,
            imageUrl: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800&q=80",
            rating: 4.0,
            reviewCount: 1,
            inStock: true,
            category: "Furniture",
            reviews: [
              {
                id: "r6",
                productId: "2",
                userName: "James Wilson",
                userImageUrl: "https://i.pravatar.cc/150?u=james",
                rating: 4,
                title: "Good support",
                comment: "Helped alleviate my back pain during long work days.",
                reviewDate: new Date("2026-03-12")
              }
            ]
          },
          {
            id: "3",
            name: "Wireless Headphones",
            description: "Industry-leading noise cancellation.",
            price: 349.50,
            imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
            rating: 4.5,
            reviewCount: 2,
            inStock: true,
            category: "Electronics",
            reviews: [
              {
                id: "r2",
                productId: "3",
                userName: "Mark Smith",
                userImageUrl: "https://i.pravatar.cc/150?u=mark",
                rating: 4,
                title: "Great sound",
                comment: "The noise cancellation is top-notch.",
                reviewDate: new Date("2026-06-01")
              },
              {
                id: "r3",
                productId: "3",
                userName: "Sarah Connor",
                userImageUrl: "https://i.pravatar.cc/150?u=sarah",
                rating: 5,
                title: "Best investment",
                comment: "Blocks out all the office noise.",
                reviewDate: new Date("2026-06-10")
              }
            ]
          },
          {
            id: "4",
            name: "Mechanical Keyboard",
            description: "Tactile switches with RGB.",
            price: 129.99,
            imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
            rating: 0,
            reviewCount: 0,
            inStock: false,
            category: "Electronics",
            reviews: []
          },
          {
            id: "5",
            name: "Organic Cotton T-Shirt",
            description: "Soft and breathable.",
            price: 25.00,
            imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
            rating: 3,
            reviewCount: 1,
            inStock: true,
            category: "Apparel",
            reviews: [
              {
                id: "r4",
                productId: "5",
                userName: "David Lee",
                userImageUrl: "https://i.pravatar.cc/150?u=david",
                rating: 3,
                title: "Okay quality",
                comment: "The cotton is soft, but it shrunk a bit.",
                reviewDate: new Date("2026-04-20")
              }
            ]
          },
          {
            id: "6",
            name: "Ceramic Coffee Mug",
            description: "Handcrafted 12oz mug.",
            price: 18.50,
            imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&q=80",
            rating: 5,
            reviewCount: 1,
            inStock: true,
            category: "Kitchen",
            reviews: [
              {
                id: "r9",
                productId: "6",
                userName: "Mia Wong",
                userImageUrl: "https://i.pravatar.cc/150?u=mia",
                rating: 5,
                title: "So beautiful!",
                comment: "The design is very elegant.",
                reviewDate: new Date("2026-06-15")
              }
            ]
          },
          {
            id: "7",
            name: "Running Shoes",
            description: "Cushioned sneakers.",
            price: 110.00,
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
            rating: 5,
            reviewCount: 1,
            inStock: true,
            category: "Footwear",
            reviews: [
              {
                id: "r7",
                productId: "7",
                userName: "Chloe Bennett",
                userImageUrl: "https://i.pravatar.cc/150?u=chloe",
                rating: 5,
                title: "Like walking on clouds",
                comment: "Extremely comfortable for my morning jogs.",
                reviewDate: new Date("2026-06-28")
              }
            ]
          },
          {
            id: "8",
            name: "Smart Watch",
            description: "Health and fitness tracker.",
            price: 399.99,
            imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
            rating: 5,
            reviewCount: 1,
            inStock: true,
            category: "Electronics",
            reviews: [
              {
                id: "r5",
                productId: "8",
                userName: "Elena Rodriguez",
                userImageUrl: "https://i.pravatar.cc/150?u=elena",
                rating: 5,
                title: "Changed my routine",
                comment: "I love the health tracking features.",
                reviewDate: new Date("2026-06-25")
              }
            ]
          },
          {
            id: "9",
            name: "Leather Journal",
            description: "Premium refillable journal.",
            price: 35.00,
            imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
            rating: 4,
            reviewCount: 1,
            inStock: true,
            category: "Stationery",
            reviews: [
              {
                id: "r10",
                productId: "9",
                userName: "Robert Chen",
                userImageUrl: "https://i.pravatar.cc/150?u=robert",
                rating: 4,
                title: "Nice texture",
                comment: "Good quality, though paper is thin.",
                reviewDate: new Date("2026-06-05")
              }
            ]
          },
          {
            id: "10",
            name: "Canvas Backpack",
            description: "Water-resistant, 15-inch laptop sleeve.",
            price: 75.00,
            imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
            rating: 2,
            reviewCount: 1,
            inStock: false,
            category: "Accessories",
            reviews: [
              {
                id: "r8",
                productId: "10",
                userName: "Tom Baker",
                userImageUrl: "https://i.pravatar.cc/150?u=tom",
                rating: 2,
                title: "Disappointed",
                comment: "The zipper broke within two weeks.",
                reviewDate: new Date("2026-05-30")
              }
            ]
          },
          {
            id: "11",
            name: "Noise-Canceling Earbuds",
            description: "Compact wireless earbuds.",
            price: 199.00,
            imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80",
            rating: 0,
            reviewCount: 0,
            inStock: true,
            category: "Electronics",
            reviews: []
          },
          {
            id: "12",
            name: "Stainless Steel Bottle",
            description: "Vacuum insulated, 24hr cold.",
            price: 29.99,
            imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
            rating: 0,
            reviewCount: 0,
            inStock: true,
            category: "Kitchen",
            reviews: []
          },
          {
            id: "13",
            name: "Yoga Mat",
            description: "Non-slip, eco-friendly.",
            price: 42.00,
            imageUrl: "https://images.unsplash.com/photo-1593810037583-0524495c2560?w=800&q=80",
            rating: 0,
            reviewCount: 0,
            inStock: true,
            category: "Fitness",
            reviews: []
          },
          {
            id: "14",
            name: "Electric Kettle",
            description: "Fast-boil technology.",
            price: 55.00,
            imageUrl: "https://images.unsplash.com/photo-1583182332473-b375a8986c73?w=800&q=80",
            rating: 0,
            reviewCount: 0,
            inStock: true,
            category: "Kitchen",
            reviews: []
          },
          {
            id: "15",
            name: "Gaming Mouse",
            description: "High-precision optical sensor.",
            price: 89.99,
            imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91051a365?w=800&q=80",
            rating: 0,
            reviewCount: 0,
            inStock: true,
            category: "Electronics",
            reviews: []
          }
        ],
        category: 'all',
        wishListItems: [],
        cartItems: [],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
        writeReview: false,
        searchInput: '',
        toggleSideNav: false
    } as EcommerceState),

    withStorageSync({
      key: 'moder-store', select: ({wishListItems, cartItems, user}) => ({ wishListItems, cartItems, user })
    }),

    withComputed(({ category, products, wishListItems, cartItems, selectedProductId, searchInput }) => ({
        filteredProducts: computed(() => {
            let result = products();

            if (category() !== 'all') {
                result = result.filter(p => p.category.toLowerCase() === category().toLowerCase());
            }

            const search = searchInput()?.trim().toLowerCase();
            if (search) {
                result = result.filter(p =>
                    p.name.toLowerCase().includes(search) ||
                    p.description.toLowerCase().includes(search)
                );
            }
            return result;
        }),
        wishListCount: computed(() => wishListItems().length),
        cartCount: computed(() => cartItems().length),
        selectedProduct: computed(() => products().find((p) => p.id === selectedProductId()))
    })),

    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router), route = inject(ActivatedRoute)) => ({
        setCategory: signalMethod<string>((category: string) => {
            patchState(store, { category });

            router.navigate([`/products/${category}`], {
              queryParams: { search: store.searchInput() || null},
              queryParamsHandling: 'merge'
            })
        }),
        setProductId: signalMethod<string>((productId: string) => {
          patchState(store, {selectedProductId: productId});
        }),
        setSearchInput: signalMethod<string>((searchInput: string) => {
          patchState(store, { searchInput });
          router.navigate([], {
            relativeTo: route,
            queryParams: {search: searchInput || null },
            queryParamsHandling: 'merge',
            replaceUrl: true
          })
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
        },

        proceedToCheckout: () => {
          if(!store.user()){
            matDialog.open(SignInDialog, {
              disableClose : true,
              data: {
                checkout: true
              }
            });
            return;
          }
          router.navigate(['/checkout'])
        },

        placeOrder: async () => {
          patchState(store, {loading: true});

          const user = store.user();

          if(!user) {
            toaster.error('Please login before placing order');
            patchState(store, {loading: false})
            return;
          }

          const order: Order = {
            id: crypto.randomUUID(),
            userId: user.id,
            total: Math.round(store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0)),
            items: store.cartItems(),
            paymentStatus: 'success'
          };

          await new Promise((resolve) => setTimeout(resolve, 1000));

          patchState(store, {loading: false, cartItems: []});
          router.navigate(['order-success']);
        },

        signIn: ({email, password, checkout, dialogId}: SignInParams) => {
          patchState(store, {
            user: {
              id: '1',
              email,
              name: 'Jhon Doe',
              imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
            },
          });

          matDialog.getDialogById(dialogId)?.close()
          if(checkout){
            router.navigate(['/checkout']);
          }
        },

        signUp: ({email, password, name, checkout, dialogId}: SignUpParams) => {
          patchState(store, {
            user: {
              id: '1',
              email,
              name: 'Jhon Doe',
              imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
            },
          });

          matDialog.getDialogById(dialogId)?.close()
          if(checkout){
            router.navigate(['/checkout']);
          }
        },

        signOut: () => {
          patchState(store, {user: undefined})
        },

        showWriteReview: () => {
          patchState(store, {writeReview:  true})
        },

        hideWriteReview: () => {
          patchState(store, {writeReview: false})
        },

        toggleSideNavbar: () => {
          patchState(store, {toggleSideNav: !store.toggleSideNav()})
        },

        addReview: async ({ title, comment, rating }: AddReviewParams) => {
          patchState(store, {loading: true});
          const product = store.products().find((p) => p.id === store.selectedProductId());
          if(!product){
            patchState(store, {loading: false})
            return;
          }

          const review: UserReview ={
            id: crypto.randomUUID(),
            title,
            comment,
            rating,
            productId: product.id,
            userName: store.user()?.name || '',
            userImageUrl: store.user()?.imageUrl || '',
            reviewDate: new Date()
          };

          const updatedProducts = produce(store.products(), (draft) => {
            const index = draft.findIndex((p) => p.id === product.id);
            draft[index].reviews.push(review);
            draft[index].rating = Math.round((draft[index].reviews.reduce((acc, r ) => acc + r.rating, 0) / 
              draft[index].reviews.length) * 10) / 10;

            draft[index].reviewCount = draft[index].reviews.length;
          });

          await new Promise((resolve) => setTimeout(resolve, 1000));
          patchState(store, {loading: false, products: updatedProducts, writeReview: false});

        },
        
    }))
)