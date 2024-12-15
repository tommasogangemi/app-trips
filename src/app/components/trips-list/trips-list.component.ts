import { Component } from '@angular/core';
import { ButtonComponent } from '../lib/button/button.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../services/ApiService/api.service';

@Component({
  selector: 'ba-trips-list',
  imports: [ButtonComponent],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class TripsListComponent {
  coffeeIcon = faCoffee;

  constructor(private getListService: ApiService) {
    getListService
      .getList('trips')
      .then((r) => console.log('aaaaaaaaaaaaaa', r));
  }
}
