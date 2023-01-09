/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  images: {
    domains: ['picsum.photos'],
  },
}

module.exports = nextConfig

const withTM = require("next-transpile-modules")(["gsap"]);

module.exports = withTM({});