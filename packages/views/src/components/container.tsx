export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container max-w-[2000px] py-2 px-4 flex flex-col gap-2 h-screen overflow-hidden">
      {children}
    </div>
  );
}
