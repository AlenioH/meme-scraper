const request = require('request');
const imageDownloader = require('node-image-downloader');

const memeUrl = request('https://memegen.link/examples', function (
  err,
  res,
  body,
) {
  const cheerio = require('cheerio');
  const $ = cheerio.load(body);
  const elements = $('.row a');

  for (let i = 0; i < 14; i++) {
    const url = 'https://memegen.link/';

    const links =
      url + elements[i].attribs.href.replace(/[']/g, '').split('?')[0];

    imageDownloader({
      imgs: [
        {
          uri: links,
        },
      ],
      dest: './memes',
    });
  }
});
