import { Component, inject, signal } from '@angular/core'
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem, MatListItemTitle } from '@angular/material/list';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../../store/ecommerce-store';
import { ToggleWishlistButton } from "../../components/toggle-wishlist-button/toggle-wishlist-button";

@Component({
  selector: 'app-products-grid',
  imports: [ProductCard,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    MatListItemTitle,
    TitleCasePipe, ToggleWishlistButton],
  templateUrl: './products-grid.html',
  styleUrl: './products-grid.scss',
})
export class ProductsGrid {


  store = inject(EcommerceStore);

  categories = signal<string[]>(['all', 'electronics', 'clothing', 'accessories', 'home']);

  constructor(){
  }

}
