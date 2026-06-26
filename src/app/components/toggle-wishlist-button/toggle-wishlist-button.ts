import { Component, computed, inject, input } from '@angular/core';
import { EcommerceStore } from '../../../ecommerce-store';
import { Product } from '../../models/product';
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-toggle-wishlist-button',
  imports: [MatIcon, MatIconButton],
  templateUrl: './toggle-wishlist-button.html',
  styleUrl: './toggle-wishlist-button.scss',
})
export class ToggleWishlistButton {

  product = input.required<Product>()
  store = inject(EcommerceStore);

  isInWishList = computed(() => this.store.wishListItems().find(p => p.id === this.product().id))

  toggleWishList(product: Product){
    if(this.isInWishList()){
      this.store.removeFromWishList(product);
    }else{
      this.store.addToWishList(product);
    }
  }

}
