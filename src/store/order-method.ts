import { inject } from "@angular/core";
import { OrderApi } from "../app/services/order-api";
import { Toaster } from "../app/services/toaster";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { finalize, pipe, switchMap, tap } from "rxjs";
import { patchState } from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";
import { Router } from "@angular/router";

export function orderMethods(store: any){
    const orderService = inject(OrderApi);
    const toaster = inject(Toaster);
    const router = inject(Router);

    return{
        createOrder: rxMethod<void>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap(() => {
                    return orderService.createOrder().pipe(
                        tapResponse({
                            next: (res) => {
                                console.log(res.message);
                                patchState(store, { cartItems: [] });
                                toaster.success(res.message);
                                router.navigate(['order-success']);
                            },
                            error: (err) => {
                                console.error(err);
                                toaster.error('Found an error while placing an order')
                            }
                        }),
                        finalize(() => patchState(store, { loading: false })),
                    )
                })
            )
        ),
        getMyOrders: rxMethod<void>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap(() => {
                    return orderService.getOrders().pipe(
                        tapResponse({
                            next: (res) => {
                                let lastorder = res.orders[0];
                                
                                const orderList = lastorder.items.map((item: any) => {
                                    return{
                                        ...item,
                                        image: item.images[0],
                                        status: lastorder.status,
                                        updatedTime: lastorder.updatedAt
                                    }
                                });
                                
                                patchState(store, {orderItems: orderList})
                                
                            },
                            error: (err) => {
                                console.error(err);
                            }
                        }),
                        finalize(() => patchState(store, { loading: false })),
                    )
                })
            )
        )
    }
}