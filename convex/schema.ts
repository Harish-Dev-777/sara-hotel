import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookings: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    roomType: v.string(),
    guests: v.string(),
    message: v.string(),
    status: v.union(
      v.literal("Pending"),
      v.literal("Confirmed"),
      v.literal("Cancelled")
    ),
  }),
  admins: defineTable({
    email: v.string(),
    password: v.string(),
  }).index("by_email", ["email"]),
});
