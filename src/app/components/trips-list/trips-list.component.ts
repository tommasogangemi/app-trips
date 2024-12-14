import { Component } from '@angular/core';
import { ButtonComponent } from '../lib/button/button.component';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { GetListService } from '../../services/getlist.service';

@Component({
  selector: 'ba-trips-list',
  imports: [ButtonComponent],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class TripsListComponent {
  coffeeIcon = faCoffee;

  constructor(private getListService: GetListService<unknown>) {
    const a = getListService.test();

    console.log('aaaaaaaaaaaaaa TRIPS LIST', a);
  }
}
