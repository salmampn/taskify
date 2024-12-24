import FloatingBar from "@/components/FloatingBar";

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      {children}
      <FloatingBar />
    </div>
  );
}
export default MainLayout;
