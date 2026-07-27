import { computed, inject } from "@angular/core";
import { Product } from "../app/models/product";
import { patchState, signalMethod, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import { produce } from "immer";
import { Toaster } from "../app/services/toaster";
import { CartItem } from "../app/models/cart";
import { MatDialog } from "@angular/material/dialog";
import { SignInDialog } from "../app/components/sign-in-dialog/sign-in-dialog";
import { User } from "../app/models/user";
import { ActivatedRoute, Router } from "@angular/router";
import { Order } from "../app/models/order";
import { withStorageSync } from "@angular-architects/ngrx-toolkit";
import { AddReviewParams, UserReview } from "../app/models/user-review";
import { AuthApi } from "../app/services/auth-api";
import { authMethods } from "./auth-method";
import { productMethods } from "./product-method";
import { Category } from "../app/models/category";
import { categoryMethods } from "./category-method";


export type EcommerceState = {
    products: Product[];
    category: Category | undefined;
    wishListItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
    writeReview: boolean;
    searchInput: string;
    toggleSideNav: boolean;
    categoriesList: Category[]
}

export const EcommerceStore = signalStore(
    {
        providedIn: 'root'
    },
    withState({
      products: [],
        category: undefined,
        wishListItems: [],
        cartItems: [],
        user: undefined,
        loading: false,
        selectedProductId: undefined,
        writeReview: false,
        searchInput: '',
        toggleSideNav: false,
        categoriesList: []
    } as EcommerceState),

    withStorageSync({
      key: 'moder-store', select: ({wishListItems, cartItems, user}) => ({ wishListItems, cartItems, user })
    }),

    withComputed(({ category, products, wishListItems, cartItems, selectedProductId, searchInput }) => ({
        filteredProducts: computed(() => {
            let result = products();

            if (category()?.name !== 'All') {
                result = result.filter(p => p.category?._id === category()?._id);
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

    withMethods((
        store, toaster = inject(Toaster), 
        matDialog = inject(MatDialog), 
        router = inject(Router), 
        route = inject(ActivatedRoute),
        authService = inject(AuthApi)

      ) => ({
        setCategory: signalMethod<string>((categoryId: string) => {
            const currentCategory = store.categoriesList().find((cat:Category) => cat._id === categoryId);
            
            patchState(store, { category: currentCategory });

            router.navigate([`/products/${currentCategory?.name}`], {
              queryParams: { search: store.searchInput() || null},
              queryParamsHandling: 'merge'
            })
        }),
        setProductId: signalMethod<string>((productId: string) => {
          patchState(store, {selectedProductId: productId});
        }),
        setSearchInput: signalMethod<string>((searchInput: string) => {
          patchState(store, { searchInput });
          router.navigate([`/products/${store.category()}`], {
            queryParams: {search: searchInput || null },
            queryParamsHandling: 'merge'
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
        
    })),

    withMethods(authMethods),
    withMethods(productMethods),
    withMethods(categoryMethods),

    withHooks({
      onInit(store){
        store.getAllProduct();
        store.getCategory();
        console.log('Ran withHook')
      }
    })
)