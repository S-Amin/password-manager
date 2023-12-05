const path = require("path");
const PnpWebpackPlugin = require(`pnp-webpack-plugin`);

module.exports = {
  entry: {
    main: "./dist/popup.js",
    bundle: "./dist/content.js",
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
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
