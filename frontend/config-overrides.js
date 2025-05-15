// config-overrides.js
const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    https: require.resolve("https-browserify"),
    stream: require.resolve("stream-browserify"),
    os: require.resolve("os-browserify/browser"),
    buffer: require.resolve("buffer"),
    process: require.resolve("process/browser.js"),
    path: require.resolve("path-browserify"),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser.js",
    })
  );

  return config;
};
