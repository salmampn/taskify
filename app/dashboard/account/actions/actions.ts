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

export async function updateMemberById(id: string, data: { name?: string; role?: "user" | "admin"; }) {
    const userSession = await readUserSession();
    if (userSession.data.user?.user_metadata.role !== "admin") {
        console.log("Unauthorized access attempt");
        return JSON.stringify({ error: { message: "You are not authorized to perform this action" } });
    }

    const supabase = await createSupabaseAdmin();

    // Update the user data in the accounts table if the name is provided
    if (data.name) {
        const updateAccountResult = await supabase
            .from("accounts")
            .update({ name: data.name })
            .eq("id", id);

        console.log("Update Account Result:", updateAccountResult);
        if (updateAccountResult.error) {
            console.log("Error updating account:", updateAccountResult.error.message);
            return JSON.stringify(updateAccountResult);
        }
    }

    // Update the user role in the permission table if the role is provided
    if (data.role) {
        const updatePermissionResult = await supabase
            .from("permission")
            .update({ role: data.role })
            .eq("account_id", id);

        console.log("Update Permission Result:", updatePermissionResult);
        if (updatePermissionResult.error) {
            console.log("Error updating permission:", updatePermissionResult.error.message);
            return JSON.stringify(updatePermissionResult);
        }
    }

    return JSON.stringify({ success: true, message: "User updated successfully" });
}

export async function deleteMemberById(id: string) {
    const userSession = await readUserSession();
    if (userSession.data.user?.user_metadata.role !== "admin") {
        console.log("Unauthorized access attempt");
        return JSON.stringify({ error: { message: "You are not authorized to perform this action" } });
    }

    const supabase = await createSupabaseAdmin();

    // Delete from the accounts table
    const deleteAccountResult = await supabase
        .from("accounts")
        .delete()
        .eq("id", id);

    console.log("Delete Account Result:", deleteAccountResult);
    if (deleteAccountResult.error) {
        console.log("Error deleting account:", deleteAccountResult.error.message);
        return JSON.stringify(deleteAccountResult);
    }

    // Delete from the permission table
    const deletePermissionResult = await supabase
        .from("permission")
        .delete()
        .eq("account_id", id);

    console.log("Delete Permission Result:", deletePermissionResult);
    if (deletePermissionResult.error) {
        console.log("Error deleting permission:", deletePermissionResult.error.message);
        return JSON.stringify(deletePermissionResult);
    }

    // Optionally, delete from the auth system (if needed)
    const deleteAuthResult = await supabase.auth.admin.deleteUser(id);
    console.log("Delete Auth Result:", deleteAuthResult);
    if (deleteAuthResult.error) {
        console.log("Error deleting user from auth:", deleteAuthResult.error.message);
        return JSON.stringify(deleteAuthResult);
    }

    return JSON.stringify({ success: true, message: "User deleted successfully" });
}

export async function fetchAccounts() {
    const supabase = await createSupabaseAdmin();
    const { data, error } = await supabase.from("permission").select("*,accounts(*)");

    console.log("Data:", data);

    if (error) {
        console.error("Error fetching accounts:", error);
        return [];
    }
    return data;
}