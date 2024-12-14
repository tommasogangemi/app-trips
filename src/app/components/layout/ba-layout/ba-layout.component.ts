import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './ba-layout.component.html',
  styleUrl: './ba-layout.component.css',
})
export class AppComponent {
  title = 'app-trips';
}
