import { Component, computed, inject, input } from '@angular/core';
import { Product } from '../../../models/product';
import { ViewPanel } from "../../../directives/view-panel";
import { RatingSummary } from "../rating-summary/rating-summary";
import { ViewReviewItem } from "../view-review-item/view-review-item";
import { MatButton } from "@angular/material/button";
import { EcommerceStore } from '../../../../ecommerce-store';
import { WriteReview } from "../write-review/write-review";

@Component({
  selector: 'app-view-reviews',
  imports: [ViewPanel, RatingSummary, ViewReviewItem, MatButton, WriteReview],
  templateUrl: './view-reviews.html',
  styleUrl: './view-reviews.scss',
})
export class ViewReviews {

  product = input.required<Product>();
  store = inject(EcommerceStore);

  sortedReviews = computed(() => {
    return [...this.product().reviews].sort((a,b)=>b.reviewDate.getTime() - a.reviewDate.getTime())
  });

}
