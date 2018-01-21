const chalk = require('chalk')
const dateFormat = require('dateformat')

const viewTwittes = function (tweets) {
  let strTweets = ''
  if (tweets.length === 0) {
    strTweets = 'No tweets found'
  } else {
    for (let tweet of tweets) {
      const who = chalk.blue(tweet.userName, '(@', tweet.twitterUser, ') - ', dateFormat(tweet.createdAt, 'fullDate'))
      strTweets += `
    ---
    ${who}
    ${tweet.text}
    `
    }
  }
  return strTweets
}

exports.viewTwittes = viewTwittes
