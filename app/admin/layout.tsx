import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ padding: "24px 32px", borderBottom: "1px solid #ddd", background: "#fff" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Vishwa Infra Admin</h2>
      </div>
      {children}
    </div>
  );
}
