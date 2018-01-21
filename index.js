const logger = require('winston')
var config = require('./config/config')
var argv = require('yargs').argv
var searchGithubRepositories = require('./search-github-repositories/index')
var searchTwitterMention = require('./search-twitter-mention/index')

var footballProjectsMonitoring = async function (callback) {
  var term = "football+bet+language:javascript"
  console.log("Loading Projects...");
  var repositories = await searchGithubRepositories.searchGithubRepositories(term, 10)
  var finalList = []
  for (let repo of repositories) {
    var mention = "#" + repo.name;
    try {
      var result = await searchTwitterMention.searchTwitterMention(mention, 10, null);
      repo["twittes"] = []
      repo["twittes"] = result
      finalList.push(repo);
      //console.log(finalList)        
    } catch (err) {
      logger.error(err);
    }
  }
  console.log("Projects loaded...");
  if (callback != null) {
    callback(finalList)
  }
  return finalList
}

var cli = function () {
  var yargs = require('yargs')
    .usage('Usage: $0')
    .example('$0 ', 'Get 10 github project related to football list their descriptions and twitter mention')
    .help('help')
    .alias('h', 'help')
    .epilog('Copyright 2018 Felipe Santos')

  footballProjectsMonitoring(function (result) {
    console.log("Projects found:\n");
    for (let item of result) {
      var str = 'Name: ' + item.name +
        '\nFull Name:' + item.fullName +
        '\nRepo URL:' + item.htmlUrl +
        '\nScore:' + item.score +
        '\nLanguage' + item.language +
        '\nDescription:' + item.description +
        '\nOnwer:' + item.githubUser
      str += "\nTweets:\n"
      var str1 = "";
      if (item.twittes.length == 0) {
        str1 = "No tweets found";
      }

      for (let tweet of item.twittes) {
        str1 += tweet.userName +
          "(@" + tweet.twitterUser + ")" +
          " - " + tweet.createdAt +
          "\n" + tweet.text + "\n-------\n"

      }
      str += str1 + "\n-------\n"
      console.log(str);
    }
  })
}
exports.footballProjectsMonitoring = searchTwitterMention
exports.cli = cli