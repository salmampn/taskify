import { createSupabaseServerClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createSupabaseServerClient();

  // Get the authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("Error fetching user:", userError);
    redirect("/login");
  }

  console.log("Fetching profile for user ID:", user.id);

  const { data: profile, error: profileError } = await supabase
    .from("accounts")
    .select("name")
    .eq("id", user.id)
    .single();

  console.log("Profile data:", profile);
  console.error("Profile error:", profileError);

  if (profileError) {
    if (profileError.code === "PGRST116") {
      console.warn("No profile found for this user.");
      return (
        <div className='text-4xl'>
          No profile found. Please contact support.
        </div>
      );
    }
    console.error("Error fetching profile:", profileError);
    return <div className='text-4xl'>Error loading profile</div>;
  }

  return (
    <div>
      <h1 className='text-4xl'>Welcome Back, {profile.name}!</h1>
    </div>
  );
}
