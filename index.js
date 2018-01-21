const logger = require('winston')
const searchGithubRepositories = require('./search-github-repositories/index')
const searchTwitterMention = require('./search-twitter-mention/index')
const viewResult = require('./view')

const footballProjectsMonitoring = async function (callback) {
  const term = 'football+bet+language:javascript'
  console.log('Loading Projects...')
  const repositories = await searchGithubRepositories.searchGithubRepositories(term, 10)
  let finalList = []
  for (let repo of repositories) {
    const mention = '#' + repo.name
    try {
      let result = await searchTwitterMention.searchTwitterMention(mention, 10, null)
      repo['twittes'] = []
      repo['twittes'] = result
      finalList.push(repo)
      // console.log(finalList)
    } catch (err) {
      logger.error(err)
    }
  }
  console.log('Projects loaded...')
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
    console.log(viewResult.viewResult(result))
  })
}
exports.footballProjectsMonitoring = footballProjectsMonitoring
exports.cli = cli
