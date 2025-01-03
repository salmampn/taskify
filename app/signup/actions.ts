'use server';
import { createSupabaseServerClient } from '@/utils/supabase/server'
// import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signUp(formData: FormData) {
    const supabase = await createSupabaseServerClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/signup?message=Error signing up')
    }

    redirect('/login')
}