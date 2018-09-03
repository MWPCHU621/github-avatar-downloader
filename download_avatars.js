var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

//gets all of the contributors of a given repo and repo owner
//and returns an array of objects containing information about the contributors.
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'myToken' : 'token'
    }
  };

  request(options, function(err, res, body) {
    let requested = JSON.parse(body);
    cb(err, requested);
  });

}

//
function downloadImageByURL(url, filePath) {
  request(url)

    .on('error', function(err) {
      throw err;
    })

    .on('response', function(response) {
    console.log("downloading images....");
    console.log(response.statusCode, response.statusMessage, response.headers['content-type'])

    })

    .on('end', function(respose) {
      console.log("download complete");
    })

    .pipe(fs.createWriteStream(filePath));
}


//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for(let i = 0; i < result.length; i++)
  {
    let filePath = "avatars/" + result[i]["login"];
    downloadImageByURL(result[i]["avatar_url"], filePath);
  }
});