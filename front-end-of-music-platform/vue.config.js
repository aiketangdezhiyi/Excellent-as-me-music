const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      "(/api|/homeimg|/favorite|/mp3|/animation|/avatar)": {
        target: "http://localhost:9528/",
      },
    },
    historyApiFallback: {
      index: "/index.html",
    },
    port: 9127,
    open: true,
  },
};
