/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "oaidalleapiprodscus.blob.core.windows.net",
      },
      {
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default nextConfig;

module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
};
