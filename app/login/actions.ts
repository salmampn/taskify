'use server';

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@/utils/helpers'

export async function emailLogin(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        console.log('Authentication error:', error.message);
        redirect('/login?message=Could not authenticate user');
    }

    redirect('/tasks')
}

export async function signOut() {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log('Sign out error:', error.message);
        redirect('/login?message=Could not sign out user');
    } else {
        redirect('/');
    }
}

export async function oAuthSignIn(provider: Provider) {
    if (!provider) {
        return redirect('/login?message=No provider selected')
    }

    const supabase = await createClient();
    const redirectUrl = getURL("/auth/callback")
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: redirectUrl,
        }
    })

    if (error) {
        redirect('/login?message=Could not authenticate user')
    }

    return redirect(data.url)
}