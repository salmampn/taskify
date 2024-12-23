import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

export default async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className='z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 w-full items-center px-8'>
        <nav className='flex items-center space-x-4 lg:space-x-6'>
          <Link className='mr-6 flex items-center space-x-2' href='/'>
            <span className='font-bold text-xl'>Taskify</span>
          </Link>
        </nav>
        <div className='flex flex-1 items-center justify-end space-x-2'>
          {user !== null ? (
            <form action={signOut} className='flex items-center gap-4'>
              <p>{user.email}</p>
              <Button className='py-5' variant={"destructive"}>
                Sign Out
                <LogOut />
              </Button>
            </form>
          ) : (
            <Link href='/login'>
              <Button className='px-6 py-5'>
                Login
                <LogIn />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
