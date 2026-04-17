import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    roomType: v.string(),
    guests: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const bookingId = await ctx.db.insert("bookings", {
      ...args,
      status: "Pending",
    });
    return bookingId;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("bookings")
      .order("desc")
      .collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("bookings"),
    status: v.union(
      v.literal("Pending"),
      v.literal("Confirmed"),
      v.literal("Cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});
