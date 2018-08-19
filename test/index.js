'use strict';

const test = require('ava');
const Moocher = require('..');
const http = require('http');
const URL = 'http://localhost:3003';
let shouldFail = false;
// create a tiny server that so we can make local requests for these unit tests
const server = http.createServer((req, res) => {
  if (shouldFail) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end();
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head></head>
      <body><h1>BOOGNISH</h1></body>
      </html>
    `);
  }

});
server.listen(3003);

test.beforeEach(() => shouldFail = false);
// once we're done, kill the test server
test.after.always.cb(t => {
  server.close(() => t.end());
});

test('throws given invalid arguments', t => {
  t.throws(() => new Moocher());
});

test.cb('handles a single url', t => {
  t.plan(1);
  let callCount = 0;
  const mooch = new Moocher(URL);

  mooch
    .on('mooch', () => callCount++)
    .on('complete', () => {
      t.is(callCount, 1);
      t.end();
    })
    .start();
});

test.cb('handles an array of urls', t => {
  t.plan(1);
  let callCount = 0;
  const mooch = new Moocher(new Array(5).fill(URL));

  mooch
    .on('mooch', () => callCount++)
    .on('complete', () => {
      t.is(callCount, 5);
      t.end();
    })
    .start();
});

test.cb.serial('emits an "error" event given a failed request', t => {
  t.plan(1);
  shouldFail = true;
  const mooch = new Moocher(URL);

  mooch
    .on('error', () => {
      t.pass();
      t.end();
    })
    .start();
});
