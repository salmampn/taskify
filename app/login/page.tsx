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
import { emailLogin } from "./actions";
import { OAuthButtons } from "@/components/oauth-signin";
import Header from "@/components/Header";

export default async function Login() {
  return (
    <section className='container'>
      <Header />
      <div className='h-full flex justify-center items-center overflow-hidden p-28'>
        <Card className='mx-auto max-w-sm'>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
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
              <Button className='w-full' formAction={emailLogin}>
                Login
              </Button>
              <OAuthButtons />
            </form>
            <div className='flex text-center text-sm items-center justify-center gap-1'>
              <p>Don&apos;t have an account?</p>
              <Link href='/signup' className='underline'>
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}