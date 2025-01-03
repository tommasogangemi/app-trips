import { Component, computed, effect, inject } from '@angular/core';
import { ButtonComponent } from '../../lib/button/button.component';
import { CircularLoaderComponent } from '../../lib/circular-loader/circular-loader.component';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { TripsService } from '../../../services/TripsService/trips.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ListViewService } from '../../../services/lib/ListViewService/list-view.service';
import { ListPaginationPayload } from '../../../../types/api';
import { SelectComponent } from '../../lib/select/select.component';

@Component({
  selector: 'ba-trips-list',
  imports: [
    TripCardComponent,
    CircularLoaderComponent,
    ButtonComponent,
    RouterLink,
    RouterLinkActive,
    SelectComponent,
  ],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class TripsListComponent {
  tripsService = inject(TripsService);
  listViewService = new ListViewService('trips-list');

  readonly INITIAL_PAGINATION: ListPaginationPayload = { page: 1, limit: 20 };

  private refetchListEffect = effect(() => {
    this.tripsService.list.load({
      ...this.listViewService.listQueryPayload(),
      pagination: this.INITIAL_PAGINATION,
    });
  });

  /**
   * Used to compare with the value of the selected sort
   */
  stringifiedActiveSort = computed(() =>
    JSON.stringify(this.listViewService.sortService.sort())
  );

  onSortChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    if (!value) {
      this.listViewService.sortService.resetSort();
    } else {
      this.listViewService.sortService.setSort(JSON.parse(value));
    }
  }

  onLoadNextPage() {
    this.tripsService.list.loadNextPage(
      this.listViewService.listQueryPayload()
    );
  }
}
