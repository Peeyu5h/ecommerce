import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from "../header-actions/header-actions";
import { SearchProducts } from "../../components/search-products/search-products";

@Component({
  selector: 'app-header',
  imports: [MatToolbar, HeaderActions, SearchProducts],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
