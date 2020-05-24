const request = require('request');
const imageDownloader = require('node-image-downloader');
const cheerio = require('cheerio');
const fs = require('fs');

//the function checks if the fir alrrady exists, if it doen't the function creates one
fs.exists('./memes', function (exists) {
  if (!exists) {
    fs.mkdirSync('./memes');
  }
});

//connects to the web-site
request('https://memegen.link/examples', function (err, res, body) {
  const $ = cheerio.load(body); //gets the html code of the entire site body
  const elements = $('.row a'); //gets the html codes of the elemets .row a

  //the loop sorts out the first 10 images and downloads them
  for (let i = 0; i < 10; i++) {
    const url = 'https://memegen.link/';

    const linkString = url + elements[i].attribs.href.split('?')[0]; //the path to the individual links of the images

    imageDownloader({
      imgs: [
        {
          uri: linkString,
          filename: `${i}`,
        },
      ],
      dest: './memes',
    })
      .then((info) => {
        console.log('Image downloaded', info);
      })
      .catch((error, response, body) => {
        console.log('Something went wrong!');
        console.log(error);
      });
  }
});
