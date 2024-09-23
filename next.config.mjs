/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**' // Permitir cualquier imagen de Unsplash
      },
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/img/**' // Permitir cualquier logo desde Tailwind UI
      }
    ]
  }
};

export default nextConfig;
