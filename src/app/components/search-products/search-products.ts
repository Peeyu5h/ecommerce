import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInput, MatPrefix } from '@angular/material/input';
import { MatIcon } from "@angular/material/icon";
import { EcommerceStore } from '../../../ecommerce-store';
@Component({
  selector: 'app-search-products',
  imports: [MatInput, FormsModule, MatIcon, MatPrefix],
  templateUrl: './search-products.html',
  styleUrl: './search-products.scss',
})
export class SearchProducts {

  searchInput: string = '';
  store = inject(EcommerceStore);

}
