var argv = require('yargs').argv
var Twitter = require('twitter')
var fatalError = null
var logger = require('winston')

try {
  var config = require('../config/config')
} catch (err) {
  fatalError = err.message
}
try {
  var configTwitter = require('./config')
} catch (err) {
  fatalError += fatalError != null ?
    '\n' + err.message :
    err.message
}

var client = new Twitter({
  consumer_key: configTwitter.consumerKey,
  consumer_secret: configTwitter.consumerSecret,
  access_token_key: configTwitter.accessTokenKey,
  access_token_secret: configTwitter.accessTokenSecret
})

var adaptTwitterResult = function (items) {
  var list = []
  for (let item of items) {
    list.push({
      createdAt: item.created_at,
      text: item.text,
      userName: item.user.name,
      twitterUser: item.user.screen_name
    });
  }
  return list;
}
var searchTwitterMention = async function (term, limit, callback) {
  if (fatalError != null) {
    console.log(fatalError)
    return []
  }
  logger.verbose('Term:' + term + ', limit:' + limit + '\n');
  try {
    var params = {
      q: term,
      count: limit
    }
    logger.verbose("loading twitter mention for " + term + "...")
    var result = await client.get('search/tweets', params)
    var list = adaptTwitterResult(result.statuses)
    logger.verbose("loaded");
    if (callback != null) {
      callback(list, null)
    }
    return list
  } catch (err) {
    logger.error(err);
    return null
  }

}

var cli = function () {
  var yargs = require('yargs')
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

  var argv = yargs.argv
  if (argv.t && argv.l) {
    searchTwitterMention(argv.t, argv.l, function (list, err) {
      console.log("Tweets:\n");
      for (let item of list) {
        var str = item.userName +
          "(@" + item.twitterUser + ")" +
          " - " + item.createdAt +
          "\n" + item.text + "\n-------\n"
        console.log(str);
      }
    })
  }
}

exports.searchTwitterMention = searchTwitterMention
exports.cli = cli