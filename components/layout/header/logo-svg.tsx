export function LogoSvg({ className }: { className?: string }) {
  return (
    <div className={`font-light text-3xl md:text-5xl tracking-widest uppercase text-foreground flex items-center h-full ${className || ''}`}>
      LUMINA
    </div>
  );
}
