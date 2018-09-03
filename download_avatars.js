//required files and methods/api.
var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');


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

  //converts the requests body and converts to an actual javascript object/array.
  request(options, function(err, res, body) {
    let requested = JSON.parse(body);
    cb(err, requested);
  });

}

//download the images provided by url, and saves the image to filePath
//or create the file at filePath destination if it does not exist.
function downloadImageByURL(url, filePath) {
  request(url)

    //if url is invalid, throws the error.
    .on('error', function(err) {
      throw err;
    })

    //if response is valid, console logs download status.
    .on('response', function(response) {
    console.log("downloading images....");
    console.log(response.statusCode, response.statusMessage, response.headers['content-type'])

    })

    //on finish, console logs completed message.
    .on('end', function(respose) {
      console.log("download complete");
    })

    //pipes the result to filePath and saves it if it already exists
    // or creates the file if it doesn't exist.
    .pipe(fs.createWriteStream(filePath));
}


//-------------MAIN CODE TO RUN DOWNLOAD_AVATARS.JS FILE---------------


console.log('Welcome to the GitHub Avatar Downloader!');

//gets the bash arguments and removes the first 2 items in the array.
let myArgs = process.argv.slice(2);


//checks to see if the argument array length is exactly 2.
//if not, prints error message and does not continue.
if(myArgs.length !== 2) {
  console.log("ERROR. did not provide correct argument count.");
}
else {
  //function on line 9.
  getRepoContributors(myArgs[0], myArgs[1], function(err, result) {
    console.log("Errors:", err);

    for(let i = 0; i < result.length; i++)
    {
      let filePath = "avatars/" + result[i]["login"];
      downloadImageByURL(result[i]["avatar_url"], filePath);
    }
  });
}

