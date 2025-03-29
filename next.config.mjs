/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
    loader: 'akamai',
    path: '/',
  },
};

export default nextConfig;
