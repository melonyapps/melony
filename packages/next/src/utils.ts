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
