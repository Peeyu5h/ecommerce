import { Component, inject, signal } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInput } from "@angular/material/input";
import { OptionItem } from '../../../models/option-item';
import { EcommerceStore } from '../../../../ecommerce-store';
import { MatButton } from "@angular/material/button";
import { MatOption, MatSelect } from "@angular/material/select";

@Component({
  selector: 'app-write-review',
  imports: [ViewPanel, MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatButton, MatSelect, MatOption],
  templateUrl: './write-review.html',
  styleUrl: './write-review.scss',
  host: {
    class: 'block'
  }
})
export class WriteReview {

  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  ratingOptions = signal<OptionItem[]>([
    {label: '5 Stars - Excellent', value: 5},
    {label: '4 Stars - Good', value: 4},
    {label: '3 Stars - Average', value: 3},
    {label: '2 Stars - Poor', value: 2},
    {label: '1 Stars - Terable', value: 1},
  ])
  reviewForm = this.fb.group({
    title: ['', Validators.required],
    comment: ['', Validators.required],
    rating: ['', Validators.required]
  });

  saveReview(){

  }

}
