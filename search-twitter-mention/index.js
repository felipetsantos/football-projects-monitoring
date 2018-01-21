const Twitter = require('twitter')
const viewTwittes = require('./view')
let fatalError = null
const logger = require('winston')
require('../config/config')
let configTwitter =  require('./config')


const client = new Twitter({
  consumer_key: configTwitter.consumerKey,
  consumer_secret: configTwitter.consumerSecret,
  access_token_key: configTwitter.accessTokenKey,
  access_token_secret: configTwitter.accessTokenSecret
})

const adaptTwitterResult = function (items) {
  return items.map((item) => ({
    createdAt: item.created_at,
    text: item.text,
    userName: item.user.name,
    twitterUser: item.user.screen_name
  }))
}

const searchTwitterMention = async function (term, limit, callback) {
  logger.verbose('Term:' + term + ', limit:' + limit + '\n')
  try {
    var params = {
      q: term,
      count: limit
    }
    logger.verbose('loading twitter mention for ' + term + '...')
    var result = await client.get('search/tweets', params)
    var list = adaptTwitterResult(result.statuses)
    logger.verbose('loaded')
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
    .example('$0 -t football -l 10', 'returns 10 twitter mention related to football term')
    .help('help')
    .alias('h', 'help')
    .epilog('Copyright 2018 Felipe Santos')

  const argv = yargs.argv
  if (argv.t && argv.l) {
    searchTwitterMention(argv.t, argv.l, function (list, err) {
      console.log(viewTwittes.viewTwittes(list))
    })
  }
}

exports.searchTwitterMention = searchTwitterMention
exports.cli = cli
