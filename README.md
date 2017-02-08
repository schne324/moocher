# Moocher
Web content scraper

## Installation

```bash
$ npm install moocher
```

## Usage

```js
new Moocher(urls, options);
```

- `urls` {String|Array} a single string url or an array of urls to scrape content from.
- `options` {Object} the configuration object.
  - `limit` {Number} the number of concurrent requests to make while scraping.

## API
Moocher emits the following events:

- `"mooch"`: Emits for each response. The callback receives the following arguments:
  - `$`: The cheerio-loaded document. This means you can just use jQuery methods on the response document. NOTE: if the raw HTML is desired use `$.html`.
  - `url`: The original url passed to Moocher.
- `"error"`: Emits when a single request fails (404, 500, etc..)
- `"complete"`: Emits when the moocher is done mooching.



## Example
```js
const mooch = new Moocher([
  'https://url-1.com',
  'http://url-2.com',
  'http://url-3.com',
  'https://url-4.com',
  'http://url-5.com'
], {
  limit: 10 // allow only 10 concurrent requests
});

mooch
  // emitted for each web page mooched
  .on('mooch', ($, url) => {
    const $foo = $('.foo');
    if (url === 'http://url-2.com') {
      // do some stuff
    }
  })
  // emitted if any request fails
  .on('error', (err) => console.error(err))
  // emitted when all urls have been mooched
  .on('complete', () => {
    console.log('all of the content has been mooched');
  })
  // start mooching!
  .start();
```
