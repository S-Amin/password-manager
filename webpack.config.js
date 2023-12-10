const path = require("path");
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
  entry: {
    "public/js/main": "./dist/popup.js",
    "dist/extension/bundle": "./dist/content.js",
  }, // TODO fix the entry point so the mapping works
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./"),
  },
  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
