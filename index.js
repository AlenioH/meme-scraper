const request = require('request');
const imageDownloader = require('node-image-downloader');
const cheerio = require('cheerio');
const fs = require('fs');

//creates a folder
fs.mkdirSync('memes');

//connects to the web-site
request('https://memegen.link/examples', function (err, res, body) {
  const $ = cheerio.load(body); //gets the html code of the entire site body
  const elements = $('.row a'); //gets the html codes of the elemets .row a

  //the loop sorts out the first 10 images and downloads them
  for (let i = 0; i < 10; i++) {
    const url = 'https://memegen.link/';

    const links = url + elements[i].attribs.href.split('?')[0]; //the path to the individual links of the images

    imageDownloader({
      imgs: [
        {
          uri: links,
          filename: `${i}`,
        },
      ],
      dest: './memes',
    });
  }
});
