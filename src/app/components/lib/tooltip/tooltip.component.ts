import { Component, input } from '@angular/core';

@Component({
  selector: 'ba-tooltip',
  imports: [],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.css',
})
export class TooltipComponent {
  text = input<string | undefined>();
}
