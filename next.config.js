/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['placeholder.com'], // Add any image domains you're using
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
