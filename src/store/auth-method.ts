import { inject } from "@angular/core";
import { AuthApi } from "../app/services/auth-api";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { patchState } from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators"
import { SignInParams, SignUpParams } from "../app/models/user";
import { Toaster } from "../app/services/toaster";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";

export function authMethods(store: any){
    const authService = inject(AuthApi);
    const toaster = inject(Toaster);
    const matDialog = inject(MatDialog);
    const router = inject(Router);

    return {
        signIn: rxMethod<SignInParams>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((params) => {
                    console.log("Inside Auth methods")
                    const payload = { email: params.email, password: params.password}
                    return authService.login(payload).pipe(
                        tapResponse({
                            next:(res) =>{

                                toaster.success("Logged in Successfully!");
                                localStorage.setItem('token', res.token);

                                patchState(store,{
                                    user: {
                                    id: res.user.id,
                                    email: res.user.email,
                                    name: res.user.name,
                                    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
                                    }
                                });
                                
                                matDialog.getDialogById(params.dialogId)?.close();
                                if(params.checkout){
                                    router.navigate(['/checkout']);
                                }
                            },
                            error:(err) => {
                                toaster.error("Log In Failed!")
                                console.error(err);
                            }
                        })
                    )}
                )
            )
        ),

        signUp: rxMethod<SignUpParams>(
            pipe(
                tap(() => patchState(store, { loading: true })),
                switchMap((params) => {
                    console.log("Inside SignUp methods");
                    const payload = { name: params.name, email: params.email, password: params.password}
                    return authService.register(payload).pipe(
                        tapResponse({
                            next:(res) =>{

                                toaster.success(res.success);

                                patchState(store,{
                                    user: {
                                    id: res.user.id,
                                    email: res.user.email,
                                    name: res.user.name,
                                    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
                                    }
                                });
                                
                                matDialog.getDialogById(params.dialogId)?.close();
                                if(params.checkout){
                                    router.navigate(['/checkout']);
                                }
                            },
                            error:(err) => {
                                toaster.error("Registration Failed!")
                                console.error(err);
                            }
                        })
                    )}
                )
            )
        )
    }
}