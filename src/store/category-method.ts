import { inject } from "@angular/core";
import { CategoryApi } from "../app/services/category-api";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { patchState } from "@ngrx/signals";
import { tapResponse } from "@ngrx/operators";
import { Category } from "../app/models/category";

export function categoryMethods(store: any){
    const categoryService = inject(CategoryApi);

    return{
        getCategory: rxMethod<void>(
            pipe(
                tap(() => patchState(store, {loading: true})),
                switchMap((id) => {
                    return categoryService.getAllCategory().pipe(
                        tapResponse({
                            next:(res) =>{
                                let defaultCategory;
                                const allCategories: Category = res.allCategory.map((cat:any) => {
                                    const catObject: Category = {
                                        _id: cat._id,
                                        name: cat.name,
                                        isActive: cat.isActive
                                    }
                                    if(cat.name === 'All') defaultCategory = catObject;

                                    return catObject
                                });
                                patchState(store, {categoriesList: allCategories, category: defaultCategory})
                            },
                            error:(err) => {
                                console.error(err);
                            }
                        })
                    )
                })
            )
        ),


    }
}