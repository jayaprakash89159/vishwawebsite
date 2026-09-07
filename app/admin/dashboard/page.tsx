import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/lib/auth";
import { getPublicSiteData } from "@/lib/db";
import { addMediaAction, addProjectAction, addVideoAction, logoutAdmin, updatePage, updateSite } from "@/app/actions";

export default async function AdminDashboardPage() {
  const user = await getAuthenticatedUser();
  if (!user) {
    redirect("/admin/login");
  }

  const data = getPublicSiteData();

  return (
    <main style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "30px" }}>
        <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #ddd" }}>
          <div style={{ color: "#777" }}>Pages</div>
          <strong style={{ fontSize: "1.8rem" }}>1</strong>
        </div>
        <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #ddd" }}>
          <div style={{ color: "#777" }}>Projects</div>
          <strong style={{ fontSize: "1.8rem" }}>{data.projects.length}</strong>
        </div>
        <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #ddd" }}>
          <div style={{ color: "#777" }}>Videos</div>
          <strong style={{ fontSize: "1.8rem" }}>{data.videos.length}</strong>
        </div>
      </div>

      <form action={updateSite} style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #ddd", marginBottom: "24px" }}>
        <h3>Site Settings</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          <label>Site name<input defaultValue={data.settings.siteName} name="siteName" style={inputStyle} /></label>
          <label>Tagline<input defaultValue={data.settings.tagline} name="tagline" style={inputStyle} /></label>
          <label>Phone<input defaultValue={data.settings.phone} name="phone" style={inputStyle} /></label>
          <label>Email<input defaultValue={data.settings.email} name="email" style={inputStyle} /></label>
          <label style={{ gridColumn: "1 / -1" }}>Address<textarea defaultValue={data.settings.address} name="address" style={{ ...inputStyle, minHeight: "80px" }} /></label>
          <label>Brochure link<input defaultValue={data.settings.brochureLink} name="brochureLink" style={inputStyle} /></label>
          <label>Footer text<input defaultValue={data.settings.footerText} name="footerText" style={inputStyle} /></label>
          <label>Logo text<input defaultValue={data.settings.logoText} name="logoText" style={inputStyle} /></label>
        </div>
        <button type="submit" style={buttonStyle}>Save Settings</button>
      </form>

      <form action={updatePage} style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #ddd", marginBottom: "24px" }}>
        <h3>Homepage Content</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          <label>Hero title<input defaultValue={data.page.heroTitle} name="heroTitle" style={inputStyle} /></label>
          <label>Hero subtitle<input defaultValue={data.page.heroSubtitle} name="heroSubtitle" style={inputStyle} /></label>
          <label>About title<input defaultValue={data.page.aboutTitle} name="aboutTitle" style={inputStyle} /></label>
          <label style={{ gridColumn: "1 / -1" }}>About text<textarea defaultValue={data.page.aboutText} name="aboutText" style={{ ...inputStyle, minHeight: "100px" }} /></label>
          <label>Services title<input defaultValue={data.page.servicesTitle} name="servicesTitle" style={inputStyle} /></label>
          <label style={{ gridColumn: "1 / -1" }}>Services text<textarea defaultValue={data.page.servicesText} name="servicesText" style={{ ...inputStyle, minHeight: "100px" }} /></label>
          <label>Achievements title<input defaultValue={data.page.achievementsTitle} name="achievementsTitle" style={inputStyle} /></label>
          <label style={{ gridColumn: "1 / -1" }}>Achievements text<textarea defaultValue={data.page.achievementsText} name="achievementsText" style={{ ...inputStyle, minHeight: "80px" }} /></label>
          <label>Projects title<input defaultValue={data.page.portfolioTitle} name="portfolioTitle" style={inputStyle} /></label>
          <label>Clients title<input defaultValue={data.page.clientsTitle} name="clientsTitle" style={inputStyle} /></label>
          <label>News title<input defaultValue={data.page.newsTitle} name="newsTitle" style={inputStyle} /></label>
          <label>Contact title<input defaultValue={data.page.contactTitle} name="contactTitle" style={inputStyle} /></label>
        </div>
        <button type="submit" style={buttonStyle}>Save Homepage Content</button>
      </form>

      <form action={addProjectAction} style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #ddd", marginBottom: "24px" }}>
        <h3>Add Project</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <label>Title<input name="title" style={inputStyle} /></label>
          <label>Image URL<input name="imageUrl" placeholder="/uploads/example.jpg" style={inputStyle} /></label>
          <label>Order<input type="number" name="orderIndex" defaultValue={0} style={inputStyle} /></label>
          <label style={{ gridColumn: "1 / -1" }}>Description<textarea name="description" style={{ ...inputStyle, minHeight: "100px" }} /></label>
        </div>
        <button type="submit" style={buttonStyle}>Add Project</button>
      </form>

      <form action={addMediaAction} style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #ddd", marginBottom: "24px" }} encType="multipart/form-data">
        <h3>Add Image</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <label>Title<input name="title" style={inputStyle} /></label>
          <label>Alt text<input name="alt" style={inputStyle} /></label>
          <label>Section<input name="section" defaultValue="homepage" style={inputStyle} /></label>
          <label>Caption<input name="caption" style={inputStyle} /></label>
          <label style={{ gridColumn: "1 / -1" }}>File<input type="file" name="file" accept="image/*" style={inputStyle} /></label>
        </div>
        <button type="submit" style={buttonStyle}>Upload Image</button>
      </form>

      <form action={addVideoAction} style={{ background: "#fff", padding: "24px", borderRadius: "12px", border: "1px solid #ddd", marginBottom: "24px" }}>
        <h3>Add Video</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          <label>Title<input name="title" style={inputStyle} /></label>
          <label>URL<input name="url" placeholder="https://youtube.com/watch?v=..." style={inputStyle} /></label>
          <label>Section<input name="section" defaultValue="homepage" style={inputStyle} /></label>
          <label style={{ gridColumn: "1 / -1" }}>Description<textarea name="description" style={{ ...inputStyle, minHeight: "100px" }} /></label>
        </div>
        <button type="submit" style={buttonStyle}>Add Video</button>
      </form>

      <form action={logoutAdmin} style={{ marginTop: "24px" }}>
        <button type="submit" style={{ ...buttonStyle, background: "#b33a3a" }}>Logout</button>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "0.95rem",
  marginTop: "6px"
};

const buttonStyle: React.CSSProperties = {
  marginTop: "18px",
  background: "#0a4d3d",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  padding: "10px 18px",
  cursor: "pointer",
  fontWeight: 600
};
