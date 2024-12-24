import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signUp } from "./actions";
import { OAuthButtons } from "@/components/oauth-signin";
import Header from "@/components/Header";

export default async function SignUp() {
  return (
    <section className='container'>
      <Header />
      <div className='flex justify-center items-center p-28'>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Sign up</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <form id='login-form' className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='email@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                </div>
                <Input
                  minLength={6}
                  name='password'
                  id='password'
                  type='password'
                  required
                />
              </div>
              <Button className='w-full' formAction={signUp}>
                Sign up
              </Button>
              <OAuthButtons />
            </form>
            <div className='flex text-center text-sm items-center justify-center gap-1'>
              <p>Already has an account?</p>
              <Link href='/login' className='underline'>
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
