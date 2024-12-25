import Header from "@/components/Header";
import { CircleCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <section>
      <Header />
      <div className='flex flex-col justify-center items-center p-64 space-y-8'>
        <div className='flex items-center gap-4'>
          <h1 className='text-balance font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            Welcome to Taskify!
          </h1>
          <CircleCheck className='w-20 h-20 text-primary' />
        </div>
        <p className='opacity-70'>
          A task management app built with Next.js and Supabase
        </p>
      </div>
    </section>
  );
}
