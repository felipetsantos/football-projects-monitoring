const logger = require('winston')
const octokit = require('@octokit/rest')()
const viewRepo = require('./view')

let fatalError = null
let configGithub = {}

try {
  require('../config/config')
} catch (err) {
  fatalError = err.message
}
try {
  configGithub = require('./config')
} catch (err) {
  fatalError += fatalError != null
    ? '\n' + err.message
    : err.message
}

octokit.authenticate({
  type: 'token',
  token: configGithub.token
})

const buildGithubParams = function (term, limit) {
  return {
    q: term,
    sort: 'stars',
    order: 'desc',
    page: 1,
    per_page: limit
  }
}

const adaptReposResult = function (items) {
  let list = []
  for (let item of items) {
    list.push({
      name: item.name,
      fullName: item.full_name,
      description: item.description,
      htmlUrl: item.html_url,
      score: item.score,
      githubUser: item.owner.login,
      language: item.language
    })
  }
  return list
}

const searchGithubRepositories = async function (term, limit, callback) {
  if (fatalError != null) {
    logger.error(fatalError)
    return []
  }
  logger.verbose('Term:' + term + ', limit:' + limit + '\n')
  const params = buildGithubParams(term, limit)
  try {
    logger.verbose('loading repositories from github...')
    const result = await octokit.search.repos(params)
    logger.verbose('repositories loaded.')
    const list = adaptReposResult(result.data.items)
    if (callback != null) {
      callback(list, null)
    }
    return list
  } catch (err) {
    logger.error(err)
    return null
  }
}

const cli = function () {
  const yargs = require('yargs')
    .usage('Usage: $0 -t [word] -l [num]')
    .demandOption(['t', 'l'])
    .describe('t', 'search term')
    .describe('l', 'result limit')
    .alias('t', 'term')
    .alias('l', 'limit')
    .example('$0 -t football -l 10', 'returns 10 repositories related to football term')
    .help('help')
    .alias('h', 'help')
    .epilog('Copyright 2018 Felipe Santos')

  const argv = yargs.argv
  if (argv.t && argv.l) {
    searchGithubRepositories(argv.t, argv.l, function (list, err) {
      console.log('Projects Found:\n')
      for (let item of list) {
        const str = viewRepo.viewRepo(item, null)
        console.log(str)
      }
    })
  }
}
exports.searchGithubRepositories = searchGithubRepositories
exports.cli = cli
