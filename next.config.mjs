/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.licdn.com',
            }
        ]
    },
    // Increase the request body size limit for image uploads
    experimental: {
        serverComponentsExternalPackages: [],
    },
};

export default nextConfig;
