import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Star, X } from 'lucide-react';
import { sound } from '../../utils/sound';

export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// ==========================================
// 1. BUTTON PRIMITIVE WITH MACHINED TACTILE FEEDBACK
// ==========================================
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'machined' | 'glass' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'champagne' | 'primary' | 'subtle' | 'bevel';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  haptic?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'machined', size = 'sm', loading, disabled, haptic = true, onClick, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center whitespace-nowrap shrink-0 select-none cursor-pointer rounded-[7px] font-medium tracking-tight transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-35';

    const variants: Record<string, string> = {
      machined: 'btn-machined-dark',
      primary: 'btn-machined-dark',
      bevel: 'btn-machined-dark',
      glass: 'btn-milled-glass',
      secondary: 'bg-black/[0.04] dark:bg-white/[0.05] hover:bg-black/[0.07] dark:hover:bg-white/[0.08] text-slate-800 dark:text-zinc-200 border border-black/[0.07] dark:border-white/[0.08] shadow-2xs active:scale-[0.985]',
      outline: 'border border-black/[0.1] dark:border-white/[0.1] hover:bg-black/[0.03] dark:hover:bg-white/[0.04] text-slate-700 dark:text-zinc-300 active:scale-[0.985]',
      ghost: 'hover:bg-black/[0.04] dark:hover:bg-white/[0.05] text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100',
      destructive: 'bg-rose-950/40 text-rose-300 border border-rose-800/40 hover:bg-rose-900/50 active:scale-[0.985]',
      champagne: 'bg-[#9e8557]/15 dark:bg-[#d4c5a9]/10 text-[#7a643b] dark:text-[#d4c5a9] border border-[#9e8557]/30 dark:border-[#d4c5a9]/20 hover:bg-[#9e8557]/20 active:scale-[0.985]',
      subtle: 'bg-[#9e8557]/15 dark:bg-[#d4c5a9]/10 text-[#7a643b] dark:text-[#d4c5a9] border border-[#9e8557]/30 dark:border-[#d4c5a9]/20 hover:bg-[#9e8557]/20 active:scale-[0.985]'
    };

    const sizes = {
      xs: 'h-6.5 px-2 text-[11px] gap-1',
      sm: 'h-7.5 px-2.5 text-xs gap-1.5',
      md: 'h-8.5 px-3 text-xs gap-2',
      lg: 'h-9.5 px-4 text-xs gap-2',
      icon: 'h-7.5 w-7.5 p-0'
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (haptic) sound.click();
      if (onClick) onClick(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        className={cn(base, variants[variant] || variants.machined, sizes[size], className)}
        {...props}
      >
        {loading && (
          <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin mr-1.5 opacity-70" />
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// ==========================================
// 2. BADGE & STATUS INDICATOR PRIMITIVE
// ==========================================
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'neutral' | 'champagne' | 'outline' | 'success' | 'warning' | 'destructive' | 'default' | 'secondary' | 'indigo' | 'purple' | 'bevel' | 'glass';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  pulse = false,
  children,
  ...props
}) => {
  const base = 'inline-flex items-center font-medium select-none tracking-tight gap-1.5';
  const sizeStyles = size === 'sm' ? 'px-1.5 py-0 text-[10px] rounded' : 'px-2 py-0.5 text-[11px] rounded-md';

  const variants: Record<string, string> = {
    neutral: 'bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08]',
    default: 'bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08]',
    secondary: 'bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08]',
    champagne: 'bg-[#9e8557]/15 dark:bg-[#d4c5a9]/10 text-[#7a643b] dark:text-[#d4c5a9] border border-[#9e8557]/30 dark:border-[#d4c5a9]/30 font-semibold',
    success: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25',
    warning: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25',
    destructive: 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border border-rose-500/25',
    outline: 'border border-black/[0.12] dark:border-white/[0.12] text-slate-700 dark:text-zinc-300',
    indigo: 'bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border border-indigo-500/25',
    purple: 'bg-purple-500/15 text-purple-800 dark:text-purple-300 border border-purple-500/25',
    bevel: 'bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08]',
    glass: 'bg-black/[0.04] dark:bg-white/[0.06] text-slate-700 dark:text-zinc-300 border border-black/[0.06] dark:border-white/[0.08]'
  };

  return (
    <div className={cn(base, sizeStyles, variants[variant] || variants.neutral, className)} {...props}>
      {pulse && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
      )}
      {children}
    </div>
  );
};

// ==========================================
// 3. CARD CONTAINER WITH SPECULAR CHAMFER
// ==========================================
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  chamfer?: boolean;
  glint?: 'subtle' | 'champagne' | 'none';
  variant?: 'glass' | 'raised' | 'sunken' | 'default';
  hover?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, chamfer = true, glint = 'subtle', variant = 'glass', hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'specimen-glass',
          chamfer && 'specimen-chamfer',
          glint === 'champagne' && 'specimen-chamfer-champagne',
          hover && 'hover:scale-[1.01] transition-transform cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

// ==========================================
// 4. INPUT & TEXTAREA PRIMITIVES
// ==========================================
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-8 w-full rounded-[6px] border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#12151D] px-2.5 py-1 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4c5a9]/50 focus-visible:border-[#d4c5a9]/50 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex w-full rounded-[6px] border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#12151D] px-2.5 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4c5a9]/50 focus-visible:border-[#d4c5a9]/50 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

// ==========================================
// 5. CHECKBOX & SWITCH PRIMITIVES
// ==========================================
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      sound.click();
      if (onChange) onChange(e);
    };

    return (
      <input
        type="checkbox"
        ref={ref}
        onChange={handleChange}
        className={cn(
          'h-3.5 w-3.5 rounded border-black/[0.2] dark:border-white/[0.2] bg-white dark:bg-[#12151D] text-[#9e8557] dark:text-[#d4c5a9] cursor-pointer transition-all focus:ring-0 focus:ring-offset-0',
          className
        )}
        {...props}
      />
    );
  }
);
Checkbox.displayName = 'Checkbox';

export interface SwitchProps {
  checked: boolean;
  onChange?: (checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, onCheckedChange, disabled }) => {
  const handleToggle = () => {
    sound.click();
    const next = !checked;
    if (onChange) onChange(next);
    if (onCheckedChange) onCheckedChange(next);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none',
        checked ? 'bg-[#9e8557] dark:bg-[#d4c5a9]' : 'bg-zinc-700'
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
          checked ? 'translate-x-4' : 'translate-x-0'
        )}
      />
    </button>
  );
};

// ==========================================
// 6. SEGMENTED CONTROL
// ==========================================
export interface SegmentedControlProps {
  options: { label: string; value: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ options, value, onChange }) => {
  return (
    <div className="nav-rail-pill">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => {
            sound.click();
            onChange(opt.value);
          }}
          className={cn(
            'nav-rail-item flex items-center gap-1.5',
            value === opt.value && 'nav-rail-item-active'
          )}
        >
          {opt.icon && <span>{opt.icon}</span>}
          <span>{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

// ==========================================
// 7. RATING STARS
// ==========================================
export const RatingStars: React.FC<{ rating: number; max?: number }> = ({ rating, max = 5 }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'w-3 h-3',
            i < rating
              ? 'text-[#9e8557] dark:text-[#d4c5a9] fill-[#9e8557] dark:fill-[#d4c5a9]'
              : 'text-slate-300 dark:text-zinc-700'
          )}
        />
      ))}
    </div>
  );
};

// ==========================================
// 8. MODAL DIALOG CONTAINER
// ==========================================
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md'
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in"
      />
      <div
        className={cn(
          'relative w-full rounded-[14px] bg-white dark:bg-[#12151D] border border-black/10 dark:border-white/15 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 z-10 specimen-chamfer specimen-chamfer-champagne',
          maxWidthClasses[maxWidth]
        )}
      >
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/10">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">{title}</h3>
            {subtitle && <div className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-[6px] text-slate-400 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export { LocalAtsLogo, LocalAtsMark } from './LocalAtsLogo';

