// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://i10b105.p.####.io:11443/api",
      pathRewrite: {
        "^/api": "",
      },
      changeOrigin: true,
    })
  );
};
