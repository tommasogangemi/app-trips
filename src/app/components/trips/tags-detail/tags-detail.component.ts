import { Component, input } from '@angular/core';

@Component({
  selector: 'ba-tags-detail',
  imports: [],
  templateUrl: './tags-detail.component.html',
  styleUrl: './tags-detail.component.css',
})
export class TagsDetailComponent {
  tags = input.required<string[]>();
}
