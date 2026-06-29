import { Component, computed, inject, input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { QtySelector } from "../../components/qty-selector/qty-selector";
import { EcommerceStore } from '../../../ecommerce-store';
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-show-cart-items',
  imports: [QtySelector, MatIconButton, MatIcon],
  templateUrl: './show-cart-items.html',
  styleUrl: './show-cart-items.scss',
})
export class ShowCartItems {

  item = input<CartItem>();
  store = inject(EcommerceStore);

  total = computed(() => {
    const item = this.item();
    if (!item || !item.product) return "0.00";
    return (item.product.price * (item.quantity ?? 0)).toFixed(2);
  });
}
