import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'ba-icon-highlighter',
  imports: [NgTemplateOutlet],
  templateUrl: './icon-highlighter.component.html',
  styleUrl: './icon-highlighter.component.css',
})
export class IconHighlighterComponent {
  private BASE_ICON_CLASS =
    'mr-1 text-neutral-400 transition-colors ease-in duration-75';

  text = input<string | number | undefined>();
  hoverColor = input<string | undefined>();

  iconElement = contentChild<TemplateRef<{ iconClass: string }>>('icon');

  iconClass = computed(() => {
    let finalIconClass = this.BASE_ICON_CLASS;

    if (this.hoverColor()) {
      finalIconClass = `${finalIconClass} cursor-pointer ${this.hoverColor()!}`;
    }

    return finalIconClass;
  });
}
