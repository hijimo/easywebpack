let P = require("./src/plugins/P");
let path = require("path");

// console.log(path.join(__dirname, "src/loaders"));
module.exports = {
  mode: "development",
  entry: "./src/index.js",

  output: {
    filename: "bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist")
  },
  resolveLoader: {
    modules: ["node_modules", path.resolve(__dirname, "src", "loaders")]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          path.resolve(__dirname, "src", "loaders", "style-loader"),
          path.resolve(__dirname, "src", "loaders", "less-loader")
          // "style-loader", "less-loader"
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            // loader: "babel-loader",
            loader: path.resolve(__dirname, "src", "loaders", "babel-loader"),
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                // ["@babel/plugin-proposal-decorators", { legacy: true }],
                // ["@babel/plugin-proposal-class-properties", { loose: true }]
              ]
            }
          }
        ]
      },
    ]
  },
  plugins: [new P()]
};
