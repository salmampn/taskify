import { CircleCheck } from "lucide-react";

export default function Home() {
  return (
    <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-64'>
      <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
        <div className='flex items-center gap-4'>
          <h1 className='text-balance font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
            Welcome to Taskify!
          </h1>
          <CircleCheck className='w-20 h-20 text-primary' />
        </div>
        <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 opacity-70'>
          A task management app built with Next.js and Supabase
        </p>
      </div>
    </section>
  );
}
