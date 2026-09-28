import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: process.env.BASE_PATH || "" },
  basePath: process.env.BASE_PATH || "",
};
export default config;
