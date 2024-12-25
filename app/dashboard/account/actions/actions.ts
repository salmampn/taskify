/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { readUserSession } from "@/utils/actions/actions";
import { createSupabaseAdmin } from "@/utils/supabase/server";

export async function createAccounts(data: {
    name: string;
    role: "user" | "admin";
    email: string;
    password: string;
    confirm: string;
}) {

    const userSession = await readUserSession();
    if (userSession.data.user?.user_metadata.role !== "admin") {
        console.log("Unauthorized access attempt");
        return JSON.stringify({ error: { message: "You are not authorized to perform this action" } });
    }

    const supabase = await createSupabaseAdmin();
    console.log("Supabase Client:", supabase);

    const createResult = await supabase.auth.admin.createUser({
        email: data.email,
        password: data.password,
        email_confirm: true,
        user_metadata: {
            role: data.role,
        }
    });
    console.log("Create User Result:", createResult);

    if (createResult.error?.message) {
        console.log("Error creating user:", createResult.error.message);
        return JSON.stringify(createResult);
    } else {
        const accountResult = await supabase.from("accounts").insert({ name: data.name, id: createResult.data.user?.id });
        console.log("Account Insert Result:", accountResult);
        if (accountResult.error?.message) {
            console.log("Error inserting account:", accountResult.error.message);
            return JSON.stringify(accountResult);
        } else {
            const permissionResult = await supabase.from("permission").insert({ role: data.role, account_id: createResult.data.user?.id });
            console.log("Permission Insert Result:", permissionResult);
            return JSON.stringify(permissionResult);
        }
    }

}
export async function updateMemberById(id: string) {
    console.log("update member");
}
export async function deleteMemberById(id: string) { }

export async function fetchAccounts() {
    const supabase = await createSupabaseAdmin();
    const { data, error } = await supabase.from("accounts").select("*");


    if (error) {
        console.error("Error fetching accounts:", error);
        return [];
    }
    return data;
}
