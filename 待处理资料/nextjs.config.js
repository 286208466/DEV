/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
      ignoreDuringBuilds: true,
    },
    distDir: "build",
    images: {
      loader: "imgix",
      path: "",
    },
    // exportPathMap: async function (
    //   defaultPathMap,
    //   { dev, dir, outDir, distDir, buildId }
    // ) {
    //   return {
    //     "/": { page: "/" },
    //     "/solution/community": { page: "/solution/community" },
    //   };
    // },
  };
  
  module.exports = nextConfig;