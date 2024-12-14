import { Component } from '@angular/core';
import { ButtonComponent } from '../lib/button/button.component';

@Component({
  selector: 'ba-trips-list',
  imports: [ButtonComponent],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class BaTripsListComponent {}
