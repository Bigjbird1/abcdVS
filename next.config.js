/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['placeholder.com'],
  },
  webpack: (config, { isServer }) => {
    // Disable asm.js optimizations
    config.optimization.minimizer.forEach((minimizer) => {
      if (minimizer.constructor.name === 'TerserPlugin') {
        minimizer.options.terserOptions = {
          ...minimizer.options.terserOptions,
          ecma: 5,
          compress: {
            ...minimizer.options.terserOptions.compress,
            asmjs: false,
          },
          mangle: {
            ...minimizer.options.terserOptions.mangle,
            keep_fnames: true,
          },
        };
      }
    });
    return config;
  },
}
module.exports = nextConfig;
