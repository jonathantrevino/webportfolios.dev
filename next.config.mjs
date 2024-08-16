/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.google.usercontent.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "**",
      },
      // 'lh3.googleusercontent.com',
      // 'firebasestorage.googleapis.com',
    ],
  },
};

export default nextConfig;
