import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to hash password using SHA-256
async function hashPassword(password: string) {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const verifyCredentials = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("admins")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (!admin) return { success: false };

    const enteredHash = await hashPassword(args.password);
    
    if (admin.password === enteredHash) {
      return { success: true };
    }
    
    return { success: false };
  },
});

export const setupAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Delete existing admins to ensure fresh start with hashing
    const existingAdmins = await ctx.db.query("admins").collect();
    for (const admin of existingAdmins) {
      await ctx.db.delete(admin._id);
    }

    const hashedPassword = await hashPassword(args.password);
    
    await ctx.db.insert("admins", {
      email: args.email,
      password: hashedPassword,
    });
    
    return "Admin created with hashed password";
  },
});

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in Convex environment variables");
    }

    // Delete existing admins to ensure fresh start
    const existingAdmins = await ctx.db.query("admins").collect();
    for (const admin of existingAdmins) {
      await ctx.db.delete(admin._id);
    }

    const hashedPassword = await hashPassword(password);
    
    await ctx.db.insert("admins", {
      email: email.trim(),
      password: hashedPassword,
    });
    
    return "Admin account successfully seeded from environment variables";
  },
});
