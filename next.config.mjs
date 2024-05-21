/** @type {import('next').NextConfig}*/
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "en.wikipedia.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.telegraph.co.uk",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.nationalparks.org",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "a.cdn-hotels.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
