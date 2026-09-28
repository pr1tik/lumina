export const ProductGrid = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">{children}</div>;
};
