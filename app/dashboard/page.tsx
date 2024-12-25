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

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching profile:", error);
    return <div>Error loading profile</div>;
  }

  return (
    <div>
      <h1>Welcome Back, {profile.name}!</h1>
      <p></p>
    </div>
  );
}
