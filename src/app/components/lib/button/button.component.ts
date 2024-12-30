import { Component, computed, input, viewChild } from '@angular/core';
import {
  BA_BUTTON_COLORS,
  BA_BUTTON_DEFAULT_CLASS,
} from './button.style-config';
import { IconDefinition } from '@fortawesome/angular-fontawesome';

export type BaButtonVariant = 'filled' | 'outlined' | 'text';
export type BaButtonColor = 'primary' | 'black' | 'neutral';

@Component({
  selector: 'button[ba]',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  host: {
    '[class]': 'baButtonClass()',
  },
})
export class ButtonComponent {
  iconSlot = viewChild('[ngprojectas~="ba-btn-icon"]');
  /**
   * The classes passed to the button.
   */
  class = input<string>();
  variant = input<BaButtonVariant>('filled');
  color = input<BaButtonColor>('black');
  icon = input<IconDefinition>();
  /**
   * Whether the button is in a loading state.
   */
  loading = input<boolean>(false);

  /**
   * Takes the string from a class attribute and removes duplicates.
   */
  removeDuplicatesFromClass(s: string) {
    return Array.from(new Set(s.split(' '))).join(' ');
  }

  /**
   * Computes the final class of the component based on the color/variant configuration
   * Adds the class from external usage if present, removing duplicates.
   */
  baButtonClass = computed(() => {
    let finalClass = BA_BUTTON_DEFAULT_CLASS;
    const inputClass = this.class();

    finalClass = finalClass.concat(
      ' ',
      BA_BUTTON_COLORS[this.color()][this.variant()]
    );

    if (inputClass) {
      finalClass = finalClass.concat(' ', inputClass);
    }

    return this.removeDuplicatesFromClass(finalClass);
  });
}
