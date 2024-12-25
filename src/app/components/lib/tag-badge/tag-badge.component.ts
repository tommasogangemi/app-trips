import { Component, input } from '@angular/core';

@Component({
  selector: 'ba-tag-badge',
  imports: [],
  templateUrl: './tag-badge.component.html',
})
export class TagBadgeComponent {
  tag = input.required<string>();
}
