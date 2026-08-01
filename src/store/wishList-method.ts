import { inject } from "@angular/core";
import { WishlistApi } from "../app/services/wishlist-api";
import { Toaster } from "../app/services/toaster";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { finalize, pipe, switchMap, tap } from "rxjs";
import { patchState } from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";

export function wishListMethods(store: any){
    const wishlistService = inject(WishlistApi);
    const toaster = inject(Toaster);

    return{
        getWishListItems: rxMethod<void>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap(() => {
                    return wishlistService.getWishListItems().pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.message);
                                const updatedList = res.wishList.map((item:any) => {
                                    return {
                                        ...item.product, id: item.product._id, inStock: item.product.stock > 0 ? true:false,
                                        category: {}, reviews: [], imageUrl: item.product.images[0]
                                    }
                                });
                                patchState(store, {wishListItems: updatedList})
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

        addProductToWishList: rxMethod<{productId: string}>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap((params) => {
                    return wishlistService.addToWishList(params.productId).pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.message);
                                const updatedList = res.wishList.items.map((item:any) => {
                                    return {
                                        ...item.product, id: item.product._id, inStock: item.product.stock > 0 ? true:false,
                                        category: {}, reviews: [], imageUrl: item.product.images[0]
                                    }
                                });
                                
                                patchState(store, {wishListItems: updatedList});
                                toaster.success("Product added to wishlist")
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

        removeProductFromWishList: rxMethod<{productId: string}>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap((params) => {
                    return wishlistService.removeWishListItem(params.productId).pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.message);
                                const updatedList = res.wishList.items.map((item:any) => {
                                    return {
                                        ...item.product, id: item.product._id, inStock: item.product.stock > 0 ? true:false,
                                        category: {}, reviews: [], imageUrl: item.product.images[0]
                                    }
                                });
                                
                                patchState(store, {wishListItems: updatedList});
                                toaster.success("Product removed from wishlist")
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

        deleteWishList: rxMethod<void>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap(() => {
                    return wishlistService.deleteWishList().pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.message);
                                patchState(store, {wishListItems: []});
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