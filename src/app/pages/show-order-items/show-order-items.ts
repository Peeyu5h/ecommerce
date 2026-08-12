import { Component, input } from '@angular/core';
import { orderItem } from '../../models/order';
import { DatePipe, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-show-order-items',
  imports: [ DatePipe, TitleCasePipe ],
  templateUrl: './show-order-items.html',
  styleUrl: './show-order-items.scss',
})
export class ShowOrderItems {
  item = input.required<orderItem>();
}
