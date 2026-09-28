export function LogoSvg({ className }: { className?: string }) {
  return (
    <div className={`font-black text-2xl md:text-3xl tracking-[-0.04em] uppercase text-foreground flex items-center select-none ${className || ''}`}>
      <span>LUMINA</span>
      <span className="ml-2 text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-muted text-muted-foreground tracking-widest border border-border/80">
        STUDIO
      </span>
    </div>
  );
}
