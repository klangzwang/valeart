/** @type {import('next').NextConfig} */
import { isProd, prefix } from './lib/config.mjs';
const nextConfig = {
  basePath: isProd ? '/valeart' : '',
  assetPrefix: isProd ? '/valeart/' : '',
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
