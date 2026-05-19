import type { SortOrder } from "mongoose";
import type { RequestHandler } from "express";

import { LeadModel, type Lead } from "../models/lead.model.js";
import {
  createLeadSchema,
  listLeadQuerySchema,
  updateLeadSchema
} from "../schemas/lead.schema.js";
import { ApiError } from "../utils/api-error.js";
import { escapeRegex } from "../utils/escape-regex.js";
import { leadsToCsv } from "../utils/leads-to-csv.js";

const LEADS_PER_PAGE = 10;

type LeadFilter = Partial<Pick<Lead, "status" | "source">> & {
  $or?: Array<{
    name?: RegExp;
    email?: RegExp;
  }>;
};

const buildLeadFilter = (
  query: ReturnType<typeof listLeadQuerySchema.parse>
): LeadFilter => {
  const filter: LeadFilter = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.source) {
    filter.source = query.source;
  }

  if (query.search) {
    const searchRegex = new RegExp(escapeRegex(query.search), "i");
    filter.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  return filter;
};

const buildLeadSort = (sort: "latest" | "oldest"): Record<string, SortOrder> => ({
  createdAt: sort === "latest" ? -1 : 1
});

export const createLead: RequestHandler = async (req, res, next) => {
  try {
    const payload = createLeadSchema.parse(req.body);
    const lead = await LeadModel.create(payload);

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

export const listLeads: RequestHandler = async (req, res, next) => {
  try {
    const query = listLeadQuerySchema.parse(req.query);
    const page = query.page ?? 1;
    const filter = buildLeadFilter(query);
    const skip = (page - 1) * LEADS_PER_PAGE;

    const [leads, total] = await Promise.all([
      LeadModel.find(filter).sort(buildLeadSort(query.sort)).skip(skip).limit(LEADS_PER_PAGE),
      LeadModel.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / LEADS_PER_PAGE);

    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
      pagination: {
        page,
        limit: LEADS_PER_PAGE,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getLeadById: RequestHandler = async (req, res, next) => {
  try {
    const lead = await LeadModel.findById(req.params.id);

    if (!lead) {
      throw new ApiError(404, "Lead not found");
    }

    res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

export const updateLead: RequestHandler = async (req, res, next) => {
  try {
    const payload = updateLeadSchema.parse(req.body);
    const lead = await LeadModel.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });

    if (!lead) {
      throw new ApiError(404, "Lead not found");
    }

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: lead
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLead: RequestHandler = async (req, res, next) => {
  try {
    const lead = await LeadModel.findByIdAndDelete(req.params.id);

    if (!lead) {
      throw new ApiError(404, "Lead not found");
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const exportLeadsCsv: RequestHandler = async (req, res, next) => {
  try {
    const query = listLeadQuerySchema.parse(req.query);
    const leads = await LeadModel.find(buildLeadFilter(query)).sort(buildLeadSort(query.sort));
    const csv = leadsToCsv(leads);

    res.header("Content-Type", "text/csv");
    res.attachment("leads.csv");
    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};
