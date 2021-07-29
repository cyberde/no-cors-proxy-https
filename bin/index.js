#!/usr/bin/env node

const {networkInterfaces} = require('os');
const argv = require('yargs').argv
const NoCorsProxy = require('../lib')

// NETWORK
const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
  for (const net of nets[name]) {
    // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
    if (net.family === 'IPv4' && !net.internal) {
      if (!results[name]) {
        results[name] = [];
      }
      results[name].push(net.address);
    }
  }
}

// CONFIG
const port = argv.p || argv.port
const host = argv.h || argv.host
const target = argv.t || argv.target
const key = argv.k || argv.key
const cert = argv.c || argv.cert

if (!key || !cert) {
  console.info(`Пример запуска: no-cors-proxy -c path/to/cert.pem -k path/to/key.pem -h ${results["en0"][0]} -p 8000 -t https://server.address.ru`)
}

if (!key) {
  console.error('Не указан ключ');
  return;
}

if (!cert) {
  console.error('Не указан сертификат');
  return;
}

const proxy = new NoCorsProxy(port, host, target, key, cert)
proxy.start()

console.info(`Проксируем с https://${proxy.config.host}:${proxy.config.port} на ${proxy.config.target}`)
