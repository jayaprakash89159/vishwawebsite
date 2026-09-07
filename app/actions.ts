"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE, getAuthenticatedUser } from "@/lib/auth";
import { createMedia, createProject, createVideo, deleteMedia, deleteProject, deleteVideo, getUserByEmail, saveSession, updatePageContent, updateProject, updateSiteSettings } from "@/lib/db";

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const user = getUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    throw new Error("Invalid email or password");
  }

  const token = createSessionToken();
  saveSession(token, user.id);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const { deleteSession } = await import("@/lib/db");
    deleteSession(token);
  }
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function updateSite(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  updateSiteSettings({
    siteName: String(formData.get("siteName") || ""),
    tagline: String(formData.get("tagline") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    address: String(formData.get("address") || ""),
    brochureLink: String(formData.get("brochureLink") || ""),
    footerText: String(formData.get("footerText") || ""),
    logoText: String(formData.get("logoText") || ""),
  });
}

export async function updatePage(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  updatePageContent({
    heroTitle: String(formData.get("heroTitle") || ""),
    heroSubtitle: String(formData.get("heroSubtitle") || ""),
    aboutTitle: String(formData.get("aboutTitle") || ""),
    aboutText: String(formData.get("aboutText") || ""),
    servicesTitle: String(formData.get("servicesTitle") || ""),
    servicesText: String(formData.get("servicesText") || ""),
    achievementsTitle: String(formData.get("achievementsTitle") || ""),
    achievementsText: String(formData.get("achievementsText") || ""),
    portfolioTitle: String(formData.get("portfolioTitle") || ""),
    clientsTitle: String(formData.get("clientsTitle") || ""),
    newsTitle: String(formData.get("newsTitle") || ""),
    contactTitle: String(formData.get("contactTitle") || ""),
  });
}

export async function addProjectAction(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const imageUrl = String(formData.get("imageUrl") || "").trim();
  const orderIndex = Number(formData.get("orderIndex") || 0);

  if (!title || !description) {
    throw new Error("Project title and description are required.");
  }

  createProject({ title, description, imageUrl, orderIndex });
}

export async function editProjectAction(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const id = Number(formData.get("id"));
  updateProject(id, {
    title: String(formData.get("title") || ""),
    description: String(formData.get("description") || ""),
    imageUrl: String(formData.get("imageUrl") || ""),
    orderIndex: Number(formData.get("orderIndex") || 0),
    isVisible: formData.get("isVisible") === "on",
  });
}

export async function removeProjectAction(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const id = Number(formData.get("id"));
  deleteProject(id);
}

export async function addMediaAction(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const title = String(formData.get("title") || "").trim();
  const alt = String(formData.get("alt") || "").trim();
  const section = String(formData.get("section") || "").trim();
  const caption = String(formData.get("caption") || "").trim();
  const file = formData.get("file") as File | null;

  if (!file || !file.name) {
    throw new Error("A media file is required.");
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const filePath = `/uploads/${safeName}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const directory = `${process.cwd()}/public/uploads`;
  const fs = await import("fs");
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(`${directory}/${safeName}`, buffer);

  createMedia({ title, alt, url: filePath, section, caption });
}

export async function removeMediaAction(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const id = Number(formData.get("id"));
  deleteMedia(id);
}

export async function addVideoAction(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  createVideo({
    title: String(formData.get("title") || ""),
    url: String(formData.get("url") || ""),
    description: String(formData.get("description") || ""),
    section: String(formData.get("section") || "homepage"),
    isVisible: String(formData.get("isVisible") || "on") === "on",
  });
}

export async function removeVideoAction(formData: FormData) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const id = Number(formData.get("id"));
  deleteVideo(id);
}
