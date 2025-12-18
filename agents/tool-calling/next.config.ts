import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Turbopack configuration
	turbopack: {
		root: process.cwd(),
	},
	cacheComponents: true,
	// TypeScript configuration
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// Only enable this if you want to proceed with type errors
		ignoreBuildErrors: false,
	},
};

export default nextConfig;
