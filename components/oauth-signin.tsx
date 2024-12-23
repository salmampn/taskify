"use client";
import { Button } from "@/components/ui/button";
import { Provider } from "@supabase/supabase-js"; // Ensure this is correctly imported
import { Github } from "lucide-react";
import { oAuthSignIn } from "@/app/login/actions";
import { JSX } from "react";

type OAuthProvider = {
  name: Provider;
  displayName: string;
  icon?: JSX.Element;
};

export function OAuthButtons() {
  const oAuthProviders: OAuthProvider[] = [
    {
      name: "github" as Provider, // Ensure the name is cast to Provider type
      displayName: "GitHub",
      icon: <Github className='size-5' />,
    },
  ];

  return (
    <>
      {oAuthProviders.map((provider) => (
        <Button
          key={provider.name} // Add a key prop for each button
          className='w-full flex items-center justify-center gap-2'
          variant='outline'
          onClick={async () => {
            try {
              await oAuthSignIn(provider.name);
            } catch (error) {
              console.error("Error during OAuth sign-in:", error);
              // Optionally, handle the error (e.g., show a notification)
            }
          }}
        >
          {provider.icon}
          Login with {provider.displayName}
        </Button>
      ))}
    </>
  );
}
