import type { ZodError } from "zod";

interface FieldError {
  field: string;
  message: string;
}

export const formatZodError = (error: ZodError): FieldError[] => {
  return error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message
  }));
};

