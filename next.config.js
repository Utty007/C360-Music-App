const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Add the url-loader rule for mp3 files
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: false, // Disable base64 encoding for larger files
            fallback: "file-loader",
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    });

    if (!isServer) {
      // Exclude mp3 files from being processed by webpack on the server
      config.resolve.fallback.fs = false;
    }

    return config;
  },
};

module.exports = nextConfig;
