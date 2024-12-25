import React from "react";
import { ModeToggle } from "@/components/ModeToggle";
import SignOut from "./SignOut";
import { PersonIcon, CrumpledPaperIcon } from "@radix-ui/react-icons";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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

// Menu items.
const items = [
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard");
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className='flex items-center justify-between p-4'>
            {user !== null ? (
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
            ) : (
              <Link className='mr-6 flex items-center space-x-2' href='/'>
                <SidebarGroupLabel className='text-2xl font-bold text-black dark:text-white'>
                  Taskify
                </SidebarGroupLabel>
              </Link>
            )}

            <ModeToggle />
          </div>
          <SidebarGroupContent className='mt-8'>
            <SidebarMenu className='flex flex-col gap-4'>
              {items.map((item) => (
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
