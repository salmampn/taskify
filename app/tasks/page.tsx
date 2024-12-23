import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Tasks() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <div>Tasks</div>;
}
