'use strict';

const request = require('request');
const async = require('async');
const Emitter = require('component-emitter');
const $ = require('cheerio');

module.exports = class {
  constructor(urls, options) {
    this.options = options || {};

    if ('string' === typeof urls) { urls = [urls] }

    if (!urls || !urls.length) {
      throw new Error('At least 1 url must be provided in the options.urls array');
    }

    this.urls = urls;

    // expose event emitter
    Emitter(this);
  }

  start() {
    const q = async.queue((url, callback) => {
      request(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          throw new Error(err || `Error ${url} (${response.statusCode})`);
        }

        this.emit('mooch', $.load(body), url);
        callback();
      });
    }, this.options.limit || 2);

    q.drain = () => {
      this.emit('complete');
    };

    q.push(this.urls);
    return this;
  }
}
