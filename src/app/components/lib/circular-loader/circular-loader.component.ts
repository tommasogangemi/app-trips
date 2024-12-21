import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

type CircularLoaderSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_CLASSES_MAP: Record<CircularLoaderSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-4',
  lg: 'w-12 h-12 border-4',
  xl: 'w-16 h-16 border-4',
};

@Component({
  selector: 'ba-circular-loader',
  imports: [NgClass],
  templateUrl: './circular-loader.component.html',
  styleUrl: './circular-loader.component.css',
})
export class CircularLoaderComponent {
  colorClass = input<string>('text-primary-500');
  size = input<CircularLoaderSize>('md');

  computedClass = computed(
    () => `${this.colorClass()} ${SIZE_CLASSES_MAP[this.size()]}`
  );
}
