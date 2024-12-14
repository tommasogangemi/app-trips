import { BaButtonColor, BaButtonVariant } from './button.component';

export const BA_BUTTON_DEFAULT_CLASS =
  'rounded-full px-2 py-1 font-medium transition-colors';

export const BA_BUTTON_COLORS: Record<
  BaButtonColor,
  Record<BaButtonVariant, string>
> = {
  primary: {
    filled: 'bg-primary-500 text-white hover:bg-primary-600',
    outlined: 'border border-primary-500 text-primary-600 hover:bg-primary-50',
    text: 'text-primary-500 hover:text-primary-300',
  },
  black: {
    filled: 'bg-black text-white hover:bg-neutral-700',
    outlined: 'border border-black text-black hover:bg-neutral-100',
    text: 'text-black hover:text-neutral-600',
  },
  neutral: {
    filled: 'bg-neutral-500 text-white hover:bg-neutral-600',
    outlined: 'border border-neutral-500 text-neutral-800 hover:bg-neutral-100',
    text: 'text-neutral-500 hover:text-neutral-400',
  },
};
