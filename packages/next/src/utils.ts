import { Collection } from "@melony/core/config";
import crypto from "crypto";

export const getParams = (req: Request) => {
  let url;
  try {
    url = new URL(req.url);
  } catch (err) {
    throw new Error(`err`);
  }
  return url.pathname
    .replace("api", "")
    .split("/")
    .map((x) => decodeURIComponent(x))
    .filter(Boolean);
};

export const hashPassword = (password: string) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

export function refineData({
  collection,
  data,
}: {
  collection?: Collection;
  data: any;
}) {
  const schema = collection?.schema || [];

  const refinedData = { ...data };

  const passwordFields = schema.filter((x) => x.type === "PASSWORD");

  passwordFields.map((passwordField) => {
    const key = passwordField.slug;
    const value = data?.[key];

    const securedPassword = hashPassword(value);

    refinedData[key] = securedPassword;
  });

  return refinedData;
}
