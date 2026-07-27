import { inject } from "@angular/core"
import { ProductApi } from "../app/services/product-api"
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { patchState } from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";
import { Toaster } from "../app/services/toaster";

export function productMethods(store: any){

    const productService = inject(ProductApi);
    const toaster = inject(Toaster);

    return{
        getAllProduct: rxMethod<void>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap(() => {
                    return productService.getAllProducts().pipe(
                        tapResponse({
                            next:(res) => {
                                const productArray = res.allProducts.map((prod: any) => {
                                    return {
                                        id: prod._id,
                                        name: prod.name,
                                        description: prod.description,
                                        price: prod.price,
                                        imageUrl: prod.images[0],
                                        rating: prod.rating,
                                        reviewCount: prod.reviewCount,
                                        inStock: prod.stock > 0 ? true : false,
                                        category: prod?.category || 'all',
                                        reviews: []
                                    }
                                });
                                patchState(store, { products: productArray} );
                            },
                            error: (err) => {
                                toaster.error("Unable to load products")
                                console.error(err);
                            }
                        })
                    )
                })
            )
        ),

        getProductById: rxMethod<string>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap((id) => {
                    return productService.getProductById(id).pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.product);
                            },
                            error: (err) => {
                                toaster.error("Unable to load products details")
                                console.error(err);
                            }
                        })
                    )
                })
            )
        )
    }
}