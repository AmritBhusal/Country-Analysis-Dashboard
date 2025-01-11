import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  server: {
    open: 'http://localhost:3000/charts',
  }
};

export default nextConfig;
