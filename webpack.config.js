module.exports = {
  entry: "./src/calendar.ts",
  output: {
    filename: "calendar.js",
    path: __dirname + "./dist",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [{ test: /\.ts$/, use: "awesome-typescript-loader" }],
  },
  devServer: {
    port: 3000,
  },
};
