import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';

interface IconTemplateRefContext {
  iconClass: string;
}

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
  hoverColorClass = input<string | undefined>();

  iconElement = contentChild<TemplateRef<IconTemplateRefContext>>('icon');

  iconClass = computed(() => {
    let finalIconClass = this.BASE_ICON_CLASS;

    if (this.hoverColorClass()) {
      finalIconClass = `${finalIconClass} cursor-pointer ${this.hoverColorClass()!}`;
    }

    return finalIconClass;
  });
}
