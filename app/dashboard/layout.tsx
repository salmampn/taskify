import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "./components/SideBar";

function MainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <SideBar />
      <main className='w-full'>
        <SidebarTrigger />
        <div className='px-12 py-4'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
export default MainLayout;
