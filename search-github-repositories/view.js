const chalk = require('chalk')

const viewRepo = function (item, tweetsStr) {
  let repoStr = `${chalk.underline.bold('Project')}
    Name: ${item.name}
    Full Name: ${item.fullName}
    Repo URL: ${item.htmlUrl}
    Score: ${item.score}
    Language: ${item.language}
    Description: ${item.description}
    Onwer: ${item.githubUser}`
  if (tweetsStr != null) {
    repoStr += `
    Tweets:${tweetsStr}`
  }
  repoStr += '\n\n'
  return repoStr
}

exports.viewRepo = viewRepo
