import { defineCollection, z } from 'astro:content';

const episodes = defineCollection({
  type: 'content',
  schema: z.object({
    // Core info
    title: z.string(),
    episodeNumber: z.number(),
    description: z.string(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),

    // Duration
    duration: z.string().optional(), // e.g., "52:30"

    // Category/Tags
    category: z.string().default('Product'),
    tags: z.array(z.string()).default([]),

    // Host info
    host: z.string().default('Landseer Enga'),
    hostTitle: z.string().optional(),

    // Guest info
    guest: z.string().optional(),
    guestTitle: z.string().optional(), // e.g., "Staff Engineer"
    guestCompany: z.string().optional(), // e.g., "Uber"
    guestTwitter: z.string().optional(),
    guestLinkedIn: z.string().optional(),

    // Media
    image: z.string().optional(),

    // Platform links (episode-specific)
    spotifyUrl: z.string().optional(),
    appleUrl: z.string().optional(),
    youtubeUrl: z.string().optional(),

    // Timestamps/Chapters
    timestamps: z.array(z.object({
      time: z.string(), // e.g., "00:00"
      title: z.string(),
    })).optional(),

    // Transcript
    transcript: z.string().optional(),
  }),
});

export const collections = { episodes };
