import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from "../header-actions/header-actions";
import { SearchProducts } from "../../components/search-products/search-products";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { EcommerceStore } from '../../../ecommerce-store';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, SearchProducts, MatIcon, MatIconButton],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  store = inject(EcommerceStore);
}
