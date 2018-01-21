const chalk = require('chalk')
const viewTwittes = require('./search-twitter-mention/view')
const viewRepo = require('./search-github-repositories/view')

const viewResult = function (result) {
  let resultStr = `
${chalk.green('Projects found:')}
`
  for (let item of result) {
    const tweetsStr = viewTwittes.viewTwittes(item.twittes)
    resultStr += viewRepo.viewRepo(item, tweetsStr)
  }
  return resultStr
}

exports.viewResult = viewResult
