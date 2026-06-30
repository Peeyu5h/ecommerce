import { Component, computed, inject } from '@angular/core';
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-summarize-order',
  imports: [ViewPanel],
  templateUrl: './summarize-order.html',
  styleUrl: './summarize-order.scss',
})
export class SummarizeOrder {
  store = inject(EcommerceStore);
  subtotal = computed( ()=> 
    Math.round(this.store.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0))
  );

  tax = computed(() => Math.round( 0.05 * this.subtotal()));
  total = computed(() =>this.subtotal() - this.tax());
}
