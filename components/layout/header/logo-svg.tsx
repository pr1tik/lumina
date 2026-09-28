export function LogoSvg({ className }: { className?: string }) {
  return (
    <div className={`font-extrabold text-3xl md:text-5xl tracking-tighter uppercase bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent flex items-center h-full ${className || ''}`}>
      LUMINA
    </div>
  );
}
