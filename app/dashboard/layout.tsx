import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SideBar } from "./components/SideBar";
import { readUserSession } from "@/utils/actions/actions";
import { redirect } from "next/navigation";

async function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const {
    data: { user },
  } = await readUserSession();

  if (!user) {
    return redirect("/");
  }

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
