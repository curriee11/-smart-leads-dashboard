import type { HydratedDocument } from "mongoose";

import type { Lead } from "../models/lead.model.js";

const csvHeaders = ["Name", "Email", "Status", "Source", "Created At"];

const escapeCsvCell = (value: string): string => {
  const escapedValue = value.replace(/"/g, '""');
  return `"${escapedValue}"`;
};

export const leadsToCsv = (leads: HydratedDocument<Lead>[]): string => {
  const rows = leads.map((lead) => [
    lead.name,
    lead.email,
    lead.status,
    lead.source,
    lead.createdAt.toISOString()
  ]);

  return [csvHeaders, ...rows]
    .map((row) => row.map((cell) => escapeCsvCell(cell)).join(","))
    .join("\n");
};

