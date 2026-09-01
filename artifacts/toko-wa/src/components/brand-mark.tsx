import { MessageCircle } from 'lucide-react';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-mark">
      <span className="relative grid size-10 shrink-0 place-items-center rounded-[13px] bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] shadow-[3px_3px_0_hsl(var(--foreground)/.12)]">
        <MessageCircle size={21} strokeWidth={2.8} />
        <span className="absolute bottom-[9px] left-[12px] size-1.5 rounded-full bg-[hsl(var(--primary))]" />
      </span>
      {!compact && (
        <span className="display-font text-[21px] font-bold leading-none tracking-[-.04em] text-[hsl(var(--primary))]">
          Nixx <span className="text-[hsl(var(--accent))]">store</span>
        </span>
      )}
    </div>
  );
}