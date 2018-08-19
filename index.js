'use strict';

const assert = require('assert');
const EventEmitter = require('events');
const got = require('got');
const cheerio = require('cheerio');
const promiseLimit = require('promise-limit')
const validUrls = urls => urls && (typeof urls === 'string' || Array.isArray(urls));

module.exports = class Moocher extends EventEmitter {
  constructor(urls, options = {}) {
    super();
    // validate urls, the only required argument
    assert(validUrls(urls), 'Invalid url argument');
    this.urls = Array.isArray(urls) ? urls : [urls];
    this.options = options;
  }

  start() {
    const limit = promiseLimit(this.options.limit);
    const requests = this.urls.map(url => limit(() => this.request(url)))
    Promise.all(requests).then(() => this.emit('complete'));

    return this;
  }

  async request(url) {
    try {
      const res = await got(url);
      const $ = cheerio.load(res.body);
      this.emit('mooch', $, url, res);
    } catch (err) {
      this.emit('error', err);
    }
  }
};
