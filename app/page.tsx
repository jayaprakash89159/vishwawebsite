import { getPublicSiteData } from "@/lib/db";

export default function HomePage() {
  const data = getPublicSiteData();

  return (
    <main style={{ fontFamily: "Arial, sans-serif", color: "#1d1d1d", background: "#f8f8f8" }}>
      <header style={{ background: "#0e2d35", color: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700 }}>{data.settings.logoText}</div>
            <small style={{ color: "#d0e4df" }}>{data.settings.tagline}</small>
          </div>
          <nav style={{ display: "flex", gap: "18px", flexWrap: "wrap", fontSize: "0.95rem" }}>
            <a href="#about" style={{ color: "#fff" }}>About Us</a>
            <a href="#services" style={{ color: "#fff" }}>Infrastructure</a>
            <a href="#projects" style={{ color: "#fff" }}>Projects</a>
            <a href="#gallery" style={{ color: "#fff" }}>Gallery</a>
            <a href="#contact" style={{ color: "#fff" }}>Contact</a>
          </nav>
        </div>
      </header>

      <section style={{ background: "linear-gradient(135deg, #123e4d 0%, #2d6e62 100%)", color: "#fff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "24px", alignItems: "center" }}>
          <div>
            <p style={{ letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "0.8rem", marginBottom: "12px", color: "#d7f4eb" }}>Vishwa Infra</p>
            <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 4rem)", lineHeight: 1.15, marginBottom: "14px" }}>{data.page.heroTitle}</h1>
            <p style={{ maxWidth: "600px", fontSize: "1.1rem", lineHeight: 1.7, color: "#edf9f5" }}>{data.page.heroSubtitle}</p>
            <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#contact" style={{ background: "#f4c86a", color: "#0d2430", padding: "14px 22px", borderRadius: "999px", fontWeight: 700 }}>Contact Us</a>
              <a href={data.settings.brochureLink} style={{ border: "1px solid rgba(255,255,255,0.45)", color: "#fff", padding: "14px 22px", borderRadius: "999px" }}>Download Brochure</a>
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "10px" }}>Established in 1992</div>
            <div style={{ lineHeight: 1.8, color: "#eef8f5" }}>Projects completed 0+ • On-going projects 0+ • Clients 0</div>
          </div>
        </div>
      </section>

      <section id="about" style={{ maxWidth: "1200px", margin: "0 auto", padding: "70px 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "30px", alignItems: "center" }}>
          <div>
            <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "#4c8e7f", fontWeight: 700 }}>About Us</p>
            <h2 style={{ fontSize: "2.5rem", margin: "12px 0 20px" }}>{data.page.aboutTitle}</h2>
          </div>
          <div>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#3d3d3d" }}>{data.page.aboutText}</p>
          </div>
        </div>
      </section>

      <section id="services" style={{ background: "#ffffff", padding: "30px 20px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "18px" }}>{data.page.servicesTitle}</h2>
          <p style={{ maxWidth: "840px", marginBottom: "32px", lineHeight: 1.8, color: "#464646" }}>{data.page.servicesText}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" }}>
            {[
              "Micro Tunneling",
              "Water Treatments",
              "Sewerage Treatments",
              "Pipeline Networks",
              "Pumping Stations",
              "Reservoirs & Civil Works"
            ].map((service) => (
              <div key={service} style={{ background: "#f7f9f8", border: "1px solid #e4ece9", borderRadius: "14px", padding: "24px" }}>
                <div style={{ fontWeight: 700, fontSize: "1.2rem", marginBottom: "10px" }}>{service}</div>
                <p style={{ color: "#555", lineHeight: 1.7 }}>
                  {service === "Micro Tunneling" && "A trenchless construction technique involving excavation and pipe jacking."}
                  {service === "Water Treatments" && "Water treatment processes that improve quality for specific end-use requirements."}
                  {service === "Sewerage Treatments" && "Raw sewerage treatment designed to remove contaminants and produce reusable effluent."}
                  {service === "Pipeline Networks" && "Laying of water and wastewater pipeline networks across diverse project sites."}
                  {service === "Pumping Stations" && "Construction and commissioning of pumping stations for efficient water movement."}
                  {service === "Reservoirs & Civil Works" && "Allied infrastructure including reservoirs, civil works, and building construction."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#eff5f2", padding: "70px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "28px" }}>{data.page.achievementsTitle}</h2>
          <p style={{ fontSize: "1.1rem", color: "#4b4b4b" }}>{data.page.achievementsText}</p>
        </div>
      </section>

      <section id="projects" style={{ maxWidth: "1200px", margin: "0 auto", padding: "70px 20px" }}>
        <h2 style={{ fontSize: "2.4rem", marginBottom: "24px" }}>{data.page.portfolioTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "22px" }}>
          {data.projects.map((project) => (
            <div key={project.id} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e6e6e6" }}>
              <div style={{ height: 180, background: "linear-gradient(135deg, #cfe6df, #9dbca8)" }} />
              <div style={{ padding: "18px" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{project.title}</h3>
                <p style={{ color: "#555", lineHeight: 1.7 }}>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery" style={{ background: "#f7f7f7", padding: "70px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "2.4rem", marginBottom: "24px" }}>{data.page.clientsTitle}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
            {data.media.length ? data.media.map((item) => (
              <div key={item.id} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "12px", padding: "14px", textAlign: "center" }}>
                <img src={item.url} alt={item.alt || item.title} style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "10px" }} />
                <div style={{ marginTop: "10px", fontWeight: 600 }}>{item.title || item.section}</div>
              </div>
            )) : [1,2,3,4].map((n) => (
              <div key={n} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "12px", padding: "14px", textAlign: "center", minHeight: "160px", display: "grid", placeItems: "center" }}>
                Client {n}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "70px 20px" }}>
        <h2 style={{ fontSize: "2.4rem", marginBottom: "24px" }}>{data.page.newsTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          {data.news.map((item) => (
            <article key={item.id} style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "14px", padding: "20px" }}>
              <h3 style={{ marginBottom: "10px", fontSize: "1.1rem" }}>{item.title}</h3>
              <p style={{ color: "#555", lineHeight: 1.7 }}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" style={{ background: "#0d2430", color: "#fff", padding: "70px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
          <div>
            <p style={{ textTransform: "uppercase", letterSpacing: "0.12em", color: "#d5f0e5", marginBottom: "12px" }}>Contact</p>
            <h2 style={{ fontSize: "2.4rem", marginBottom: "18px" }}>{data.page.contactTitle}</h2>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#dfeff8" }}>{data.settings.phone}</p>
            <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#dfeff8" }}>{data.settings.email}</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "24px" }}>
            <h3 style={{ marginBottom: "12px" }}>Corporate and Regd. Office</h3>
            <p style={{ color: "#dfeff8", lineHeight: 1.8 }}>{data.settings.address}</p>
          </div>
        </div>
      </section>

      <footer style={{ background: "#071e28", color: "#dfeff8", padding: "28px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", gap: "18px", flexWrap: "wrap" }}>
          <p>{data.settings.footerText}</p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a href="https://facebook.com" style={{ color: "#dfeff8" }}>Facebook</a>
            <a href="https://twitter.com" style={{ color: "#dfeff8" }}>Twitter</a>
            <a href="https://youtube.com" style={{ color: "#dfeff8" }}>YouTube</a>
            <a href="https://linkedin.com" style={{ color: "#dfeff8" }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
