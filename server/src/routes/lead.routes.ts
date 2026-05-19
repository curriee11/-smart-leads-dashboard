import { Router } from "express";

import {
  createLead,
  deleteLead,
  exportLeadsCsv,
  getLeadById,
  listLeads,
  updateLead
} from "../controllers/lead.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

export const leadRouter = Router();

leadRouter.use(authenticate);

leadRouter.get("/", listLeads);
leadRouter.post("/", authorize("admin", "sales"), createLead);
leadRouter.get("/export", exportLeadsCsv);
leadRouter.get("/:id", getLeadById);
leadRouter.patch("/:id", authorize("admin", "sales"), updateLead);
leadRouter.delete("/:id", authorize("admin"), deleteLead);

