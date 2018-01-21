const logger = require('winston')
const octokit = require('@octokit/rest')()
const viewRepo = require('./view')
require('../config/config')
let configGithub = require('./config')


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
  return items.map((item)=>({
    name: item.name,
    fullName: item.full_name,
    description: item.description,
    htmlUrl: item.html_url,
    score: item.score,
    githubUser: item.owner.login,
    language: item.language      
  }))
}

const searchGithubRepositories = async function (term, limit, callback) {
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
