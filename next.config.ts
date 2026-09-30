import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pictures and PDFs the results email reads from disk (feedbackReport.tsx, actions.ts).
  outputFileTracingIncludes: {
    "/*": ["./public/logo.png", "./public/galaxies/*.jpg", "./public/characters/**/*.png", "./public/documents/*.pdf"],
  },
};

export default nextConfig;
