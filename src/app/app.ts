import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { EcommerceStore } from '../store/ecommerce-store';
import { Loading } from "./components/loading/loading";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, MatProgressBarModule, Loading],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ecommerce');
  store = inject(EcommerceStore);
}
