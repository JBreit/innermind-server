const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

module.exports = (parent, options) => {
  const dir = path.join(__dirname, 'controllers');
  const verbose = options.verbose;
  fs.readdirSync(dir).forEach((name) => {
    const file = path.join(dir, name);
    if (!fs.statSync(file).isDirectory()) return;
    // verbose && logger.info('\n   %s:', name);
    const obj = require(file);
    const prefix = obj.prefix || '';
    const app = express();
    let method = Object.create(null);
    let url = Object.create(null);
    const mod = obj.name;
    if (obj.engine) {
      app.set('view engine', obj.engine);
    }
    app.set('view engine', path.join(__dirname, 'controllers', mod, 'views'));
    Object.keys(obj).forEach((key) => {
      if (['name', 'prefix', 'engine', 'before'].indexOf(key)) {
        switch (key) {
        case 'index':
          method = 'GET';
          url = '/';
          break;
        default:
          throw new Error(`404 Not Found: ${name} ${key}`);
        }
        const handler = obj[key];
        url = prefix + url;
        if (obj.before) {
          app[method](url, obj.before, handler);
          verbose && logger.info(`${method} ${url} -> before -> ${key}`);
        } else {
          app[method](url, handler);
          verbose && logger.info(`${method} ${url} -> ${key}`);
        }
      }
    });
    parent.use(app);
  });
};
