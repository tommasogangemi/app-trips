import { Component } from '@angular/core';

@Component({
  selector: 'select[ba]',
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  host: {
    '[class]': 'HOST_CLASS',
  },
})
export class SelectComponent {
  private HOST_CLASS =
    'rounded-full border-[1.5px] border-neutral-200 bg-white cursor-pointer ba-select__with-arrow w-full';
}
