import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitContact = mutation({
  args: {
    name: v.string(),
    city: v.string(),
    phone: v.string(),
    problemDescription: v.string(),
  },
  handler: async (ctx, args) => {
    // Determine priority based on keywords in problem description
    const emergencyKeywords = ["abuse", "violence", "threat", "danger", "emergency", "urgent"];
    const highPriorityKeywords = ["harassment", "divorce", "legal", "court", "police"];
    
    const description = args.problemDescription.toLowerCase();
    let priority = "low";
    
    if (emergencyKeywords.some(keyword => description.includes(keyword))) {
      priority = "emergency";
    } else if (highPriorityKeywords.some(keyword => description.includes(keyword))) {
      priority = "high";
    } else {
      priority = "medium";
    }

    return await ctx.db.insert("contacts", {
      name: args.name,
      city: args.city,
      phone: args.phone,
      problemDescription: args.problemDescription,
      status: "pending",
      priority,
    });
  },
});

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db.query("stats").order("desc").first();
    return stats || {
      womenSupported: 2847,
      familiesHelped: 1923,
      casesResolved: 1654,
      marriagesSupported: 342,
      lastUpdated: Date.now(),
    };
  },
});

export const getGallery = query({
  args: { category: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (args.category) {
      return await ctx.db
        .query("gallery")
        .withIndex("by_category", (q) => q.eq("category", args.category!))
        .collect();
    }
    
    return await ctx.db.query("gallery").collect();
  },
});

export const getTestimonials = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .filter((q) => q.eq(q.field("isApproved"), true))
      .collect();
  },
});
