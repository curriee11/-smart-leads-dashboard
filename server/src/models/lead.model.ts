import { Schema, model } from "mongoose";

export const LEAD_STATUSES = ["new", "contacted", "qualified", "lost"] as const;
export const LEAD_SOURCES = ["website", "instagram", "referral"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
export type LeadSource = (typeof LEAD_SOURCES)[number];

export interface Lead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<Lead>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "new",
      required: true,
      index: true
    },
    source: {
      type: String,
      enum: LEAD_SOURCES,
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

leadSchema.index({ name: "text", email: "text" });

export const LeadModel = model<Lead>("Lead", leadSchema);

