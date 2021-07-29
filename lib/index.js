const https = require('https')
const fs = require('fs')
const url = require('url');
const httpProxy = require('http-proxy')
const path = require('path');

class NoCorsProxy {
  constructor(port, host, target, key, cert) {
    this.config = {
      port: port || 3000,
      host: host || 'localhost',
      target: target || 'http://localhost',
    }
    this.config.targetHost = url.parse(this.config.target).hostname;
    this.proxy = httpProxy.createProxyServer({})
    const pathToProject = path.dirname(require.main.filename).split('node_modules')[0];
    const KEY = `${pathToProject}${key}`;
    const CERT = `${pathToProject}${cert}`;
    this.serverOptions = {
      key: fs.readFileSync(KEY),
      cert: fs.readFileSync(CERT),
    };
  }

  start() {
    this.proxy.on('proxyReq', (proxyReq, req, res, options) => {
      proxyReq.setHeader('Host', this.config.targetHost)
    })

    this.proxy.on('proxyRes', function (proxyRes, req, res) {
      res.setHeader('Access-Control-Allow-Origin', '*')
    })

    const server = https.createServer(this.serverOptions, (req, res) => {
      if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Methods', '*')
        res.end()
        return
      }

      this.proxy.web(req, res, {
        target: this.config.target,
        secure: true
      })
    })

    server.listen(this.config.port, this.config.host)
  }
}

module.exports = NoCorsProxy
