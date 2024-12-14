import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaNavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BaNavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class AppComponent {
  title = 'app-trips';
}
