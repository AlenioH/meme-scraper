const request = require('request');
const imageDownloader = require('node-image-downloader');
const cheerio = require('cheerio');

const memeUrl = request('https://memegen.link/examples', function (
  err,
  res,
  body,
) {
  const $ = cheerio.load(body);
  const elements = $('.row a');

  for (let i = 0; i < 10; i++) {
    const url = 'https://memegen.link/';

    const links = url + elements[i].attribs.href.split('?')[0];

    imageDownloader({
      imgs: [
        {
          uri: links,
          filename: '0' + i,
        },
      ],
      dest: './memes',
    });
  }
});
