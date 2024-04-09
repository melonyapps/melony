import { Field } from "@melony/core/config";
import { z } from "zod";

export const getValidation = (field?: Field) => {
  if (!field) return z.string();

  switch (field.type) {
    case "TEXT":
      if (field.isRequired) return z.string().min(1);
      return z.string().optional();
    case "DOCUMENT":
      if (field.isRequired) return z.string().min(1);
      return z.string().optional();
    case "NUMBER":
      if (field.isRequired) return z.number().min(1);
      return z.number().optional();
    case "CURRENCY":
      if (field.isRequired) return z.number().min(1);
      return z.number().optional();

    default:
      return z.string();
  }
};
