import { Component, inject } from '@angular/core';
import { BackButton } from "../../components/back-button/back-button";
import { ShowOrderItems } from "../show-order-items/show-order-items";
import { ViewPanel } from "../../directives/view-panel";
import { EcommerceStore } from '../../../store/ecommerce-store';

@Component({
  selector: 'app-view-order',
  imports: [BackButton, ShowOrderItems, ViewPanel],
  templateUrl: './view-order.html',
  styleUrl: './view-order.scss',
})
export default class ViewOrder {

  store = inject(EcommerceStore);

}
