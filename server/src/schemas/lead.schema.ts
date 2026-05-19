import { z } from "zod";

import { LEAD_SOURCES, LEAD_STATUSES } from "../models/lead.model.js";

const leadBaseSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  status: z.enum(LEAD_STATUSES).default("new"),
  source: z.enum(LEAD_SOURCES)
});

export const createLeadSchema = leadBaseSchema;

export const updateLeadSchema = leadBaseSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required"
});

export const listLeadQuerySchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  source: z.enum(LEAD_SOURCES).optional(),
  search: z.string().trim().max(100).optional(),
  sort: z.enum(["latest", "oldest"]).default("latest"),
  page: z.coerce.number().int().positive().default(1)
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type ListLeadQuery = z.infer<typeof listLeadQuerySchema>;

