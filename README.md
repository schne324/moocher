# Moocher
Web content scraper

## Installation

```bash
$ npm install moocher
```

## Usage
```js
const mooch = new Moocher([
  'http://url-1.com',
  'http://url-2.com',
  'http://url-3.com',
  'http://url-4.com',
  'http://url-5.com'
], {
  limit: 3 // allow only 3 concurrent requests
});

mooch
  // fires for each web page mooched
  .on('mooch', ($, url) => {
    const $foo = $('.foo');
    if (url === 'http://url-2.com') {
      // do some stuff
    }
  })
  // fires when all urls have been mooched
  .on('complete', () => {
    console.log('all of the content has been mooched');
  })
  // start mooching!
  .start();
```
