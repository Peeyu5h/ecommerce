import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatAnchor, MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-empty-wishlist',
  imports: [MatIcon, MatButton, RouterLink],
  templateUrl: './empty-wishlist.html',
  styleUrl: './empty-wishlist.scss',
})
export class EmptyWishlist {

}
