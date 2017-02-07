'use strict';

const request = require('request');
const async = require('async');
const Emitter = require('component-emitter');
const $ = require('cheerio');

module.exports = class {
  constructor(options) {
    this.options = options || {};

    if (!options.urls || !options.urls.length) {
      throw new Error('At least 1 url must be provided in the options.urls array');
    }

    // expose event emitter
    Emitter(this);

    this.start();
  }

  start() {
    const self = this;

    const q = async.queue((url, callback) => {
      request(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          throw new Error(err || `Error ${url} (${response.statusCode})`);
        }

        self.emit('mooch', $.load(body), url);
        callback();
      });
    }, this.options.limit || 2);

    q.drain = () => {
      self.emit('complete');
    };
    q.push(this.options.urls);
  }
}
