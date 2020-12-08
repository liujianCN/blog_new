// const { whenDev, whenProd } = require("@craco/craco");

const CracoLessPlugin = require("craco-less");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  webpack: {
    plugin: [new TsconfigPathsPlugin()],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};

// "start": "cross-env NODE_ENV=development API=development craco start",
// "test": "cross-env NODE_ENV=production API=development craco build",
// "build": "cross-env NODE_ENV=production API=production craco build"
