const chalk = require('chalk')
const dateFormat = require('dateformat')

const viewTwittes = function (tweets) {
  let strTweets = ''
  if (tweets.length === 0) {
    strTweets = 'No tweets found'
  } else {
    for (let tweet of tweets) {
      const who = `${tweet.userName}(@${tweet.twitterUser}) - ${dateFormat(tweet.createdAt, 'fullDate')}`
      const fWho = chalk.blue(who)
      strTweets += `
    ---
    ${fWho}
    ${tweet.text}
    `
    }
  }
  return strTweets
}

exports.viewTwittes = viewTwittes
