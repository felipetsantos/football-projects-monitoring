var config = require('./config/config');
var argv = require('yargs').argv;
var config = require('./config/config');
var searchGithubRepositories = require('./search-github-repositories/index');
var searchTwitterMention = require('./search-github-repositories/index');

var footballProjectsMonitoring = function(callback){
  var result = []
  console.log("TO DO");
  callback(result);
  return result;
}

var cli = function() {
  var yargs = require('yargs')
  .usage('Usage: $0')
  .example('$0 ', 'Get 10 github project related to football list their descriptions and twitter mention')
  .help('help')
  .alias('h', 'help')
  .epilog('Copyright 2018 Felipe Santos');
  
  footballProjectsMonitoring(function(result) {
    console.log('Result: ' + result + "\n");
  });    
  
}
exports.footballProjectsMonitoring = searchTwitterMention;
exports.cli = cli;