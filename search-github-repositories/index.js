var argv = require('yargs').argv;
var logger = require('winston');
var fatalError = null;
try{
var config = require('../config/config');
}catch(err){
  fatalError = err.message;
}
try{
var configGithub = require('./config');
}catch(err){
  fatalError += fatalError != null 
    ? "\n" + err.message : 
    err.message;
}

var searchGithubRepositories = function (term, limit, callback){
  if(fatalError != null){
    console.log(fatalError);
    return [];
  }
  logger.error('No implemented');
  console.log("\nTerm:" + term + ", limit:" + limit + "\nTO DO");
  var list = [];
  callback(list,null);
  return list;
  
}


var cli = function() {
  var yargs = require('yargs')
  .usage('Usage: $0 -t [word] -l [num]')
  .demandOption(['t','l'])
  .describe('t', 'search term')
  .describe('l', 'result limit')
  .alias('t', 'term')
  .alias('l', 'limit')
  .example('$0 -t football -l 10', 'returns 10 repositories related to football term')
  .help('help')
  .alias('h', 'help')
  .epilog('Copyright 2018 Felipe Santos');
  
  var argv = yargs.argv;
  if (argv.t && argv.l) {
    searchGithubRepositories(argv.t, argv.l, function(list, err) {
      console.log('Result: ' + list + "\n");
    });    
  }
}
exports.searchGithubRepositories = searchGithubRepositories;
exports.cli = cli;