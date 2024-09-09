/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  extends: ['next', 'next/core-web-vitals'],
};

module.exports = nextConfig;
