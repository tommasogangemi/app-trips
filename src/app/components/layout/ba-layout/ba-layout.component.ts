import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaNavbarComponent } from '../ba-navbar/ba-navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaNavbarComponent],
  templateUrl: './ba-layout.component.html',
  styleUrl: './ba-layout.component.css',
})
export class AppComponent {
  title = 'app-trips';
}
