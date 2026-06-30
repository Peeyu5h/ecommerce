import { Component } from '@angular/core';
import { ViewPanel } from "../../../directives/view-panel";
import { MatIcon } from "@angular/material/icon";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";

@Component({
  selector: 'app-payment-form',
  imports: [ViewPanel, MatIcon, MatRadioButton, MatRadioGroup],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {

}
