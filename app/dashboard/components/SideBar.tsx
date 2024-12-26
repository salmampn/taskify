import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import SignOut from "./SignOut";
import { PersonIcon, CrumpledPaperIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { createSupabaseServerClient } from "@/utils/supabase/server";

// Menu items.
const allItems = [
  {
    url: "/dashboard/account",
    title: "Accounts",
    icon: PersonIcon,
  },
  {
    url: "/dashboard/tasks",
    title: "Task",
    icon: CrumpledPaperIcon,
  },
];

export async function SideBar() {
  const supabase = await createSupabaseServerClient();

  // Get the session object
  const { data: userSession } = await supabase.auth.getSession();

  let userRole = null;
  if (userSession?.session?.user) {
    userRole = userSession.session.user.user_metadata?.role;
    console.log(`User role: ${userRole}`);
  }

  // Filter menu items based on user role
  const filteredItems =
    userRole === "admin"
      ? allItems // Show all items for admin
      : allItems.filter((item) => item.title === "Task"); // Show only "Task" for other roles

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center space-x-2'>
              <Link
                className='mr-6 flex items-center space-x-2'
                href='/dashboard'
              >
                <SidebarGroupLabel className='text-2xl font-bold text-black dark:text-white'>
                  Taskify
                </SidebarGroupLabel>
              </Link>
            </div>
            <ModeToggle />
          </div>
          <SidebarGroupContent className='mt-4'>
            <SidebarMenu className='flex flex-col gap-4'>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className='mt-4 lg:mt-16'>
                <SignOut />
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
