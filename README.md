# Moocher

Web content scraper

## Installation

```bash
$ npm install --save-dev moocher # or yarn add moocher
```

## Usage

```js
new Moocher(urls, options);
```

- `urls` {String|Array} a single string url or an array of urls to scrape content from.
- `options` {Object} (optional) the configuration object.
  - `limit` {Number} (optional) the number of concurrent requests to make while scraping. Defaults to `undefined` which does not enforce a concurrency limit (all requests will be run in parallel).

## API
Moocher emits the following events:

- `"mooch"`: Emits for each response. The callback receives the following arguments:
  - `$`: The cheerio-loaded document. This means you can just use jQuery methods on the response document.
  - `url`: The original url passed to Moocher.
  - `response`: The full response object
- `"error"`: Emits when a single request fails
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
  limit: 2 // allow only 2 concurrent requests
});

mooch
  // emitted for each web page mooched
  .on('mooch', ($, url) => {
    const $h1 = $('h1');
    titles.push($h1.text());
  })
  // emitted if any request fails
  .on('error', (err) => console.error(err))
  // emitted when all urls have been mooched
  .on('complete', () => {
    console.log(`All titles have been mooched: ${titles.join(', ')}`);
  })
  // start mooching!
  .start();
```
