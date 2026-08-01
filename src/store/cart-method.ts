import { inject } from "@angular/core";
import { CartApi } from "../app/services/cart-api";
import { Toaster } from "../app/services/toaster";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { finalize, pipe, switchMap, tap } from "rxjs";
import { patchState } from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";
import { CartItem } from "../app/models/cart";

export function cartMethods(store: any){
    
    const cartService = inject(CartApi);
    const toaster = inject(Toaster);

    return{
        getCartItems: rxMethod<void>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap(() => {
                    return cartService.getCartItems().pipe(
                        tapResponse({
                            next: (res) => {
                                const cartProductList: CartItem = res.cartItems.map((item:any) => {
                                    const carItem: CartItem = {
                                        _id: item._id,
                                        product: {...item.product, id:item.product._id, imageUrl: item.product.images[0]},
                                        quantity: item.quantity
                                    }
                                    return carItem
                                });
                                
                                patchState(store, {cartItems: cartProductList});
                            },
                            error: (err) => {
                                console.error(err);
                            }
                        }),
                        finalize(() => patchState(store, { loading: false })),
                    )
                })
            )
        ),

        addProductToCart: rxMethod<{productId: string, quantity: number}>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap((params) => {
                    return cartService.addToCart(params.productId, params.quantity).pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.message);
                                const cartProductList: CartItem = res.cartList.items.map((item:any) => {
                                    const carItem: CartItem = {
                                        _id: item._id,
                                        product: {...item.product, id:item.product._id, imageUrl: item.product.images[0]},
                                        quantity: item.quantity
                                    }
                                    return carItem
                                });
                                
                                patchState(store, {cartItems: cartProductList});
                            },
                            error: (err) => {
                                console.error(err);
                            }
                        }),
                        finalize(() => patchState(store, { loading: false })),
                    )
                })
            )
        ),

        updateCartProduct: rxMethod<{productId: string, quantity: number, cartId: any}>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap((params) => {
                    return cartService.updateCart(params.productId, params.quantity, params.cartId).pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.message);
                                const cartProductList: CartItem = res.updatedCart.items.map((item:any) => {
                                    const carItem: CartItem = {
                                        _id: item._id,
                                        product: {...item.product, id:item.product._id, imageUrl: item.product.images[0]},
                                        quantity: item.quantity
                                    }
                                    return carItem
                                });
                                
                                patchState(store, {cartItems: cartProductList});
                            },
                            error: (err:any) => {
                                toaster.error(err.error.error);
                                console.error("Found Error: ",err);
                            }
                        }),
                        finalize(() => patchState(store, { loading: false })),
                    )
                })
            )
        ),

        deleteCartProduct: rxMethod<any>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap((cartId) => {
                    return cartService.removeCartItem(cartId).pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.message, res.cartItemsList.items);
                                const cartProductList: CartItem = res.cartItemsList.items.map((item:any) => {
                                    const carItem: CartItem = {
                                        _id: item._id,
                                        product: {...item.product, id:item.product._id, imageUrl: item.product.images[0]},
                                        quantity: item.quantity
                                    }
                                    return carItem
                                });
                                patchState(store, {cartItems: cartProductList})
                                toaster.success(res.message);
                            },
                            error: (err:any) => {
                                toaster.error(err.error.error);
                                console.error("Found Error: ",err);
                            }
                        }),
                        finalize(() => patchState(store, { loading: false })),
                    )
                })
            )
        )
    }
}