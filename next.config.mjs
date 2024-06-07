/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack5: true,

  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.cache = false;

    return config;
  },
};

export default nextConfig;
