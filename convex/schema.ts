import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  contacts: defineTable({
    name: v.string(),
    city: v.string(),
    phone: v.string(),
    problemDescription: v.string(),
    status: v.string(), // "pending", "contacted", "resolved"
    priority: v.string(), // "low", "medium", "high", "emergency"
  }).index("by_status", ["status"]),
  
  testimonials: defineTable({
    name: v.string(),
    story: v.string(),
    location: v.string(),
    isApproved: v.boolean(),
  }),
  
  gallery: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    category: v.string(), // "awareness", "counseling", "community", "events"
  }).index("by_category", ["category"]),
  
  stats: defineTable({
    womenSupported: v.number(),
    familiesHelped: v.number(),
    casesResolved: v.number(),
    marriagesSupported: v.number(),
    lastUpdated: v.number(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
