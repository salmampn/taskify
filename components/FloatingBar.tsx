import { House, Plus } from "lucide-react";
import Link from "next/link";

export default async function FloatingBar() {
  return (
    <div className='flex items-center justify-center fixed bottom-5 left-1/2 -translate-x-1/2 bg-black text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-105 z-50'>
      <nav className='flex justify-between items-center space-x-32'>
        <Link href='/' className='flex gap-1 items-center'>
          <Plus className='cursor-pointer p-1 rounded-full hover:bg-slate-200 hover:text-black w-8 h-8' />
          <p>Create a new tasks</p>
        </Link>
        <Link href='/tasks'>
          <House className='cursor-pointer' />
        </Link>
      </nav>
    </div>
  );
}
