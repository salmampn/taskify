import { CircleCheck } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center h-screen space-y-4'>
      <div className='flex items-center gap-4'>
        <h1 className='text-balance font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl'>
          Welcome to Taskify!
        </h1>
        <CircleCheck className='w-20 h-20 text-primary' />
      </div>
      <p className='text-xl opacity-70'>
        A task management app built with Next.js and Supabase
      </p>
    </div>
  );
}
