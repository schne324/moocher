'use strict';

const assert = require('chai').assert;
const Moocher = require('..');

/**

var mooch = new Moocher(['http://google.com'], {
  limit: 10
});

mooch
  // attach some events
  .on('mooch', ...)
  .on('complete', ...)
  // kick off the moocher
  .start()
 */

describe('Moocher', () => {
  it('should throw if no urls are provided', () => {
    try {
      new Moocher()
    } catch (e) {
      assert.isDefined(e);
    }
  });

  it('should accept a single string url', () => {
    const mooch = new Moocher('https://google.com');
    assert.deepEqual(mooch.urls, ['https://google.com']);
  });

  it('should accept an array of urls', () => {
    const urls = ['http://a.biz', 'http://b.biz']
    const mooch = new Moocher(urls);
    assert.deepEqual(mooch.urls, urls);
  });

  describe('events', () => {
    it('should fire a mooch event when a single reponse occurs', (done) => {
      const mooch = new Moocher('https://google.com');
      let called = false;
      mooch
        .on('mooch', () => {
          called = true;
        })
        .on('complete', () => {
          assert.isTrue(called);
          done();
        })
        .start();
    });

    it('should fire the complete event when everything is done', (done) => {
      const mooch = new Moocher('https://google.com');
      mooch
        .on('complete', () => {
          assert(true);
          done();
        })
        .start();
    });

    it('should pass the cheerio-loaded document object as the 1st param of mooch event callback', (done) => {
      const mooch = new Moocher('https://google.com');

      mooch
        .on('mooch', ($) => {
          assert.isDefined($.html);
          done();
        })
        .start();
    });

    it('should pass the original url as the 2nd param of mooch event callback', (done) => {
      const mooch = new Moocher('https://google.com');

      mooch.on('mooch', (_, url) => {
        assert.equal(url, 'https://google.com');
        done();
      });

      mooch.start();
    });
  });
});
