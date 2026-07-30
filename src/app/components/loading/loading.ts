import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-loading',
  imports: [MatProgressBarModule],
  templateUrl: './loading.html',
  styleUrl: './loading.scss',
})
export class Loading {

}
