import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";

const dbDir = path.join(process.cwd(), "data");
const dbPath = path.join(dbDir, "vishwa.db");

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

type SiteSettings = {
  siteName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  brochureLink: string;
  footerText: string;
  logoText: string;
};

type PageContent = {
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  servicesTitle: string;
  servicesText: string;
  achievementsTitle: string;
  achievementsText: string;
  portfolioTitle: string;
  clientsTitle: string;
  newsTitle: string;
  contactTitle: string;
};

export type ProjectRecord = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  orderIndex: number;
  isVisible: number;
};

export type MediaRecord = {
  id: number;
  title: string;
  alt: string;
  url: string;
  section: string;
  caption: string;
};

export type VideoRecord = {
  id: number;
  title: string;
  url: string;
  description: string;
  section: string;
  isVisible: number;
};

export function ensureDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      site_name TEXT NOT NULL,
      tagline TEXT,
      phone TEXT,
      email TEXT,
      address TEXT,
      brochure_link TEXT,
      footer_text TEXT,
      logo_text TEXT,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      hero_title TEXT,
      hero_subtitle TEXT,
      about_title TEXT,
      about_text TEXT,
      services_title TEXT,
      services_text TEXT,
      achievements_title TEXT,
      achievements_text TEXT,
      portfolio_title TEXT,
      clients_title TEXT,
      news_title TEXT,
      contact_title TEXT,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      order_index INTEGER DEFAULT 0,
      is_visible INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      alt TEXT,
      url TEXT,
      section TEXT,
      caption TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      url TEXT,
      description TEXT,
      section TEXT,
      is_visible INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      href TEXT,
      order_index INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const hasSettings = db.prepare("SELECT COUNT(*) as count FROM settings").get() as { count: number };
  if (hasSettings.count === 0) {
    db.prepare(`
      INSERT INTO settings (
        id, site_name, tagline, phone, email, address, brochure_link, footer_text, logo_text
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      1,
      "Vishwa Infra",
      "Creating value since 1992",
      "+91 40 2776 3835",
      "info@vishwainfra.in",
      "1-11-256/C/24, Plot No:24, Gagan Vihar Colony, Begumpet, Hyderabad, Telangana, India.",
      "https://vishwainfra.in",
      "Handkrafted with love by Social DNA",
      "Vishwa Infra"
    );
  }

  const hasPages = db.prepare("SELECT COUNT(*) as count FROM pages").get() as { count: number };
  if (hasPages.count === 0) {
    db.prepare(`
      INSERT INTO pages (
        id, hero_title, hero_subtitle, about_title, about_text, services_title, services_text,
        achievements_title, achievements_text, portfolio_title, clients_title, news_title, contact_title
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      1,
      "Creating Value Since 1992",
      "Water, wastewater, and sustainable infrastructure solutions for communities and industry.",
      "About Us",
      "When it comes to water infrastructure, if there’s one name that stands apart, it’s Vishwa Infrastructures and Services Private Limited. Acclaimed as a high-quality turnkey contractor involved in providing end-to-end solutions encompassing the entire spectrum of integrated water supply and wastewater projects which includes – Laying of water and wastewater pipeline network. Construction of water and sewage treatment plants. Construction of pumping stations. Management of NRW Project. Construction of allied infrastructure including reservoirs, civil and building works, etc.",
      "What Vishwa Offers",
      "We deliver end-to-end infrastructure solutions that support water security, sustainable growth, and long-term operational performance.",
      "Achievements",
      "Established in 1992 • Projects Completed 0+ • On-going Projects 0+ • Clients 0",
      "Key Projects",
      "Our Clients",
      "News & Events",
      "Connect with our experts now"
    );
  }

  const usersCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number };
  if (usersCount.count === 0) {
    const adminPassword = process.env.ADMIN_PASSWORD || "vishwa123";
    const hash = bcrypt.hashSync(adminPassword, 10);
    db.prepare(`
      INSERT OR IGNORE INTO users (email, password_hash, name)
      VALUES (?, ?, ?)
    `).run("admin@vishwainfra.in", hash, "Administrator");
  }

  const projectCount = db.prepare("SELECT COUNT(*) as count FROM projects").get() as { count: number };
  if (projectCount.count === 0) {
    const seedProjects = [
      { title: "Kolhapur -76MLD STP", description: "Wastewater treatment infrastructure project.", imageUrl: "" },
      { title: "Avadi 36MLD STP", description: "Sewage treatment infrastructure project.", imageUrl: "" },
      { title: "Mardhapur Water Supply", description: "Water supply network project.", imageUrl: "" },
      { title: "Kurnool School Buildings", description: "Civil works and allied infrastructure.", imageUrl: "" },
    ];
    const insertProject = db.prepare(`INSERT INTO projects (title, description, image_url, order_index, is_visible) VALUES (?, ?, ?, ?, 1)`);
    seedProjects.forEach((project, index) => insertProject.run(project.title, project.description, project.imageUrl, index));
  }

  const newsCount = db.prepare("SELECT COUNT(*) as count FROM news").get() as { count: number };
  if (newsCount.count === 0) {
    const seedNews = [
      { title: "Vishwa in Joint Venture with Anchor Ceramics", description: "A water supply scheme of value 54.71crs in TWAD Board in Trichy district under Jal Jeevan Scheme.", href: "#" },
      { title: "Vishwa received a water supply scheme worth 25.38 crore", description: "From JAL SHAKTI VIBHAG- CHURAH CONSTITUENCY- Himachal Pradesh.", href: "#" },
      { title: "A joint venture with Blue Star for RWSS sector worth 186 crores", description: "Water supply project in the RWSS sector.", href: "#" },
      { title: "In Top Hundred most India’s fastest growing mid-sized companies", description: "A proud moment for Vishwa Infra.", href: "#" },
    ];
    const insertNews = db.prepare(`INSERT INTO news (title, description, href, order_index) VALUES (?, ?, ?, ?)`);
    seedNews.forEach((item, index) => insertNews.run(item.title, item.description, item.href, index));
  }

  const videosCount = db.prepare("SELECT COUNT(*) as count FROM videos").get() as { count: number };
  if (videosCount.count === 0) {
    db.prepare(`INSERT INTO videos (title, url, description, section, is_visible) VALUES (?, ?, ?, ?, 1)`).run(
      "Company overview",
      "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      "Overview of Vishwa Infra’s infrastructure work.",
      "homepage"
    );
  }
}

export function getSettings(): SiteSettings {
  ensureDb();
  const row = db.prepare(`SELECT * FROM settings WHERE id = 1`).get() as any;
  return {
    siteName: row?.site_name || "Vishwa Infra",
    tagline: row?.tagline || "Creating value since 1992",
    phone: row?.phone || "+91 40 2776 3835",
    email: row?.email || "info@vishwainfra.in",
    address: row?.address || "1-11-256/C/24, Plot No:24, Gagan Vihar Colony, Begumpet, Hyderabad, Telangana, India.",
    brochureLink: row?.brochure_link || "#",
    footerText: row?.footer_text || "Handkrafted with love by Social DNA",
    logoText: row?.logo_text || "Vishwa Infra",
  };
}

export function getPageContent(): PageContent {
  ensureDb();
  const row = db.prepare(`SELECT * FROM pages WHERE id = 1`).get() as any;
  return {
    heroTitle: row?.hero_title || "Creating Value Since 1992",
    heroSubtitle: row?.hero_subtitle || "Water, wastewater, and sustainable infrastructure solutions for communities and industry.",
    aboutTitle: row?.about_title || "About Us",
    aboutText: row?.about_text || "When it comes to water infrastructure, if there’s one name that stands apart, it’s Vishwa Infrastructures and Services Private Limited.",
    servicesTitle: row?.services_title || "What Vishwa Offers",
    servicesText: row?.services_text || "We deliver end-to-end infrastructure solutions that support water security, sustainable growth, and long-term operational performance.",
    achievementsTitle: row?.achievements_title || "Achievements",
    achievementsText: row?.achievements_text || "Established in 1992 • Projects Completed 0+ • On-going Projects 0+ • Clients 0",
    portfolioTitle: row?.portfolio_title || "Key Projects",
    clientsTitle: row?.clients_title || "Our Clients",
    newsTitle: row?.news_title || "News & Events",
    contactTitle: row?.contact_title || "Connect with our experts now",
  };
}

export function getProjects(): ProjectRecord[] {
  ensureDb();
  const rows = db.prepare(`SELECT * FROM projects WHERE is_visible = 1 ORDER BY order_index ASC, id ASC`).all() as any[];
  return rows.map((row) => ({ id: row.id, title: row.title, description: row.description, imageUrl: row.image_url || "", orderIndex: row.order_index, isVisible: row.is_visible }));
}

export function getMedia(): MediaRecord[] {
  ensureDb();
  const rows = db.prepare(`SELECT * FROM media ORDER BY id DESC`).all() as any[];
  return rows.map((row) => ({ id: row.id, title: row.title, alt: row.alt, url: row.url, section: row.section, caption: row.caption }));
}

export function getVideos(): VideoRecord[] {
  ensureDb();
  const rows = db.prepare(`SELECT * FROM videos WHERE is_visible = 1 ORDER BY id DESC`).all() as any[];
  return rows.map((row) => ({ id: row.id, title: row.title, url: row.url, description: row.description, section: row.section, isVisible: row.is_visible }));
}

export function getNews(): Array<{ id: number; title: string; description: string; href: string; orderIndex: number }> {
  ensureDb();
  const rows = db.prepare(`SELECT * FROM news ORDER BY order_index ASC, id ASC`).all() as any[];
  return rows.map((row) => ({ id: row.id, title: row.title, description: row.description, href: row.href, orderIndex: row.order_index }));
}

export function getPublicSiteData() {
  return {
    settings: getSettings(),
    page: getPageContent(),
    projects: getProjects(),
    videos: getVideos(),
    media: getMedia(),
    news: getNews(),
  };
}

export function updateSiteSettings(data: Partial<SiteSettings>) {
  ensureDb();
  const current = getSettings();
  const next = { ...current, ...data };
  db.prepare(`
    UPDATE settings
    SET site_name = ?, tagline = ?, phone = ?, email = ?, address = ?, brochure_link = ?, footer_text = ?, logo_text = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `).run(
    next.siteName,
    next.tagline,
    next.phone,
    next.email,
    next.address,
    next.brochureLink,
    next.footerText,
    next.logoText
  );
  return getSettings();
}

export function updatePageContent(data: Partial<PageContent>) {
  ensureDb();
  const current = getPageContent();
  const next = { ...current, ...data };
  db.prepare(`
    UPDATE pages
    SET hero_title = ?, hero_subtitle = ?, about_title = ?, about_text = ?, services_title = ?, services_text = ?, achievements_title = ?, achievements_text = ?, portfolio_title = ?, clients_title = ?, news_title = ?, contact_title = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = 1
  `).run(
    next.heroTitle,
    next.heroSubtitle,
    next.aboutTitle,
    next.aboutText,
    next.servicesTitle,
    next.servicesText,
    next.achievementsTitle,
    next.achievementsText,
    next.portfolioTitle,
    next.clientsTitle,
    next.newsTitle,
    next.contactTitle
  );
  return getPageContent();
}

export function listUsers() {
  ensureDb();
  return db.prepare(`SELECT id, email, name FROM users ORDER BY id ASC`).all() as any[];
}

export function createProject(input: { title: string; description: string; imageUrl?: string; orderIndex?: number }) {
  ensureDb();
  const result = db.prepare(`
    INSERT INTO projects (title, description, image_url, order_index, is_visible)
    VALUES (?, ?, ?, ?, 1)
  `).run(input.title, input.description, input.imageUrl || "", input.orderIndex ?? 0);
  return db.prepare(`SELECT * FROM projects WHERE id = ?`).get(result.lastInsertRowid) as any;
}

export function updateProject(id: number, input: { title: string; description: string; imageUrl?: string; orderIndex?: number; isVisible?: boolean }) {
  ensureDb();
  db.prepare(`
    UPDATE projects
    SET title = ?, description = ?, image_url = ?, order_index = ?, is_visible = ?
    WHERE id = ?
  `).run(input.title, input.description, input.imageUrl || "", input.orderIndex ?? 0, input.isVisible ? 1 : 0, id);
  return db.prepare(`SELECT * FROM projects WHERE id = ?`).get(id) as any;
}

export function deleteProject(id: number) {
  ensureDb();
  db.prepare(`DELETE FROM projects WHERE id = ?`).run(id);
}

export function createMedia(input: { title: string; alt: string; url: string; section: string; caption: string }) {
  ensureDb();
  const result = db.prepare(`INSERT INTO media (title, alt, url, section, caption) VALUES (?, ?, ?, ?, ? )`).run(
    input.title,
    input.alt,
    input.url,
    input.section,
    input.caption
  );
  return db.prepare(`SELECT * FROM media WHERE id = ?`).get(result.lastInsertRowid) as any;
}

export function deleteMedia(id: number) {
  ensureDb();
  const record = db.prepare(`SELECT url FROM media WHERE id = ?`).get(id) as any;
  if (record?.url) {
    const filePath = path.join(process.cwd(), "public", record.url.replace(/^\//, ""));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
  db.prepare(`DELETE FROM media WHERE id = ?`).run(id);
}

export function createVideo(input: { title: string; url: string; description: string; section: string; isVisible?: boolean }) {
  ensureDb();
  const result = db.prepare(`
    INSERT INTO videos (title, url, description, section, is_visible)
    VALUES (?, ?, ?, ?, ?)
  `).run(input.title, input.url, input.description, input.section, input.isVisible ? 1 : 0);
  return db.prepare(`SELECT * FROM videos WHERE id = ?`).get(result.lastInsertRowid) as any;
}

export function deleteVideo(id: number) {
  ensureDb();
  db.prepare(`DELETE FROM videos WHERE id = ?`).run(id);
}

export function getUserByEmail(email: string) {
  ensureDb();
  return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as any;
}

export function saveSession(token: string, userId: number) {
  ensureDb();
  db.prepare(`INSERT INTO sessions (token, user_id) VALUES (?, ?)`).run(token, userId);
}

export function getUserBySession(token: string) {
  ensureDb();
  const row = db.prepare(`SELECT u.* FROM sessions s INNER JOIN users u ON u.id = s.user_id WHERE s.token = ?`).get(token) as any;
  return row || null;
}

export function deleteSession(token: string) {
  ensureDb();
  db.prepare(`DELETE FROM sessions WHERE token = ?`).run(token);
}

export function getDatabase() {
  return db;
}

export function seedDefaultAdminPassword() {
  ensureDb();
  const adminPassword = process.env.ADMIN_PASSWORD || "vishwa123";
  const hash = bcrypt.hashSync(adminPassword, 10);
  const existing = db.prepare(`SELECT id FROM users WHERE email = ?`).get("admin@vishwainfra.in") as any;
  if (!existing) {
    db.prepare(`INSERT OR IGNORE INTO users (email, password_hash, name) VALUES (?, ?, ?)`).run("admin@vishwainfra.in", hash, "Administrator");
  }
}

ensureDb();
seedDefaultAdminPassword();
