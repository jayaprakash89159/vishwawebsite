import { loginAdmin } from "@/app/actions";

export default function AdminLoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#eef3f0" }}>
      <form action={loginAdmin} style={{ width: "100%", maxWidth: 420, background: "#fff", padding: "32px", borderRadius: "16px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
        <h1 style={{ marginBottom: "24px", textAlign: "center" }}>Admin Login</h1>
        <label style={{ display: "block", marginBottom: "14px" }}>
          <span style={{ display: "block", marginBottom: "6px" }}>Email</span>
          <input name="email" type="email" required style={{ width: "100%", padding: "10px 12px", border: "1px solid #ccc", borderRadius: "8px" }} />
        </label>
        <label style={{ display: "block", marginBottom: "18px" }}>
          <span style={{ display: "block", marginBottom: "6px" }}>Password</span>
          <input name="password" type="password" required style={{ width: "100%", padding: "10px 12px", border: "1px solid #ccc", borderRadius: "8px" }} />
        </label>
        <button type="submit" style={{ width: "100%", background: "#0a4d3d", color: "#fff", border: "none", borderRadius: "10px", padding: "12px 16px", fontWeight: 700, cursor: "pointer" }}>
          Login
        </button>
      </form>
    </main>
  );
}
