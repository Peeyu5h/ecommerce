import { Component, inject, OnInit } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { EcommerceStore } from '../../../../store/ecommerce-store';
import { ShowCartItems } from "../../show-cart-items/show-cart-items";

@Component({
  selector: 'app-list-cart-items',
  imports: [ViewPanel, ShowCartItems],
  templateUrl: './list-cart-items.html',
  styleUrl: './list-cart-items.scss',
})
export class ListCartItems {

  store = inject(EcommerceStore);


}
