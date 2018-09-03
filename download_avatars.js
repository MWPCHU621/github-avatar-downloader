var request = require('request');
var token = require('./secrets.js');

console.log('Welcome to the GitHub Avatar Downloader!');

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

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for(let i = 0; i < result.length; i++)
  {
    console.log(result[i]["avatar_url"]);
  }
});