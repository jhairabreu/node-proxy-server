const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const url = require("url");

const app = express();
const port = 3001;
const targetUrl = "<targetUrl>";

app.use(cors());

app.use(
  "/api",
  proxy(targetUrl, {
    proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
      // Add custom headers
      proxyReqOpts.headers["Origin"] = "<origin_header>";
      proxyReqOpts.headers["Referer"] = "referer_header";

      console.log("Proxying request:");
      console.log(`- Original URL: ${srcReq.url}`);
      console.log(`- Target: ${targetUrl}`);
      console.log(`- Headers:`, proxyReqOpts.headers);

      return proxyReqOpts;
    },
    proxyReqPathResolver: function (req) {
      return req.originalUrl;
    },
  }),
);

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
  console.log(`Proxying /api/* requests to ${targetUrl}`);
});
