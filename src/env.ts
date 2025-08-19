export const EXPIRE_TIME =
  process.env.EXPIRE_TIME && !Number.isNaN(Number(process.env.EXPIRE_TIME))
    ? Number(process.env.EXPIRE_TIME)
    : 60;
export const isDev = process.env.NODE_ENV === "development";
export const BACKEND_HOST = process.env.BACKEND_HOST || "http://localhost:6777";
export const HOST = process.env.HOST || "http://localhost:3000";
