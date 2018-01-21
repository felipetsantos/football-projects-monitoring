const logger = require('winston')
const config = require('./config/config')
const argv = require('yargs').argv
const searchGithubRepositories = require('./search-github-repositories/index')
const searchTwitterMention = require('./search-twitter-mention/index')

const footballProjectsMonitoring = async function (callback) {
  const term = "football+bet+language:javascript"
  console.log("Loading Projects...");
  const repositories = await searchGithubRepositories.searchGithubRepositories(term, 10)
  let finalList = []
  for (let repo of repositories) {
    const mention = "#" + repo.name;
    try {
      let result = await searchTwitterMention.searchTwitterMention(mention, 10, null);
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

const cli = function () {
  require('yargs')
    .usage('Usage: $0')
    .example('$0 ', 'Get 10 github project related to football list their descriptions and twitter mention')
    .help('help')
    .alias('h', 'help')
    .epilog('Copyright 2018 Felipe Santos')

  footballProjectsMonitoring(function (result) {
    console.log("Projects found:\n");
    for (let item of result) {
      let str =`Name: ${item.name}
Full Name: ${item.fullName}
Repo URL: ${item.htmlUrl}
Score: ${item.score}
Language: ${item.language}
Description: ${item.description}
Onwer: ${item.githubUser}
Tweets:`
      let str1 = "";
      if (item.twittes.length == 0) {
        str1 = "No tweets found";
      }

      for (let tweet of item.twittes) {
        str1 += `${tweet.userName}(@${tweet.twitterUser}) - ${tweet.createdAt}
${tweet.text}
-------
`

      }
      str += str1 + "\n-------\n"
      console.log(str);
    }
  })
}
exports.footballProjectsMonitoring = searchTwitterMention
exports.cli = cli