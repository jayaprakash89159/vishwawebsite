import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function AdminPage() {
  const user = await getAuthenticatedUser();

  if (!user) {
    redirect("/admin/login");
  }

  redirect("/admin/dashboard");
}