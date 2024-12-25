import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Tasks() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: account, error } = await supabase
    .from("accounts")
    .select("name")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return <div className='text-4xl'>Error loading profile</div>;
  }

  return (
    <div>
      <h1 className='text-4xl'>Welcome Back, {account.name}!</h1>
    </div>
  );
}
