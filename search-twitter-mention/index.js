var argv = require('yargs').argv;
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

var searchTwitterMention = function (term, limit, callback){
  if(fatalError != null){
    console.log(fatalError);
    return [];
  }
  console.log("\nTerm:" + term + ", limit:" + limit + "\nTO DO");
  var list = [];
  callback(list,null);
  return list;
  
}


var cli = function() {
  var yargs = require('yargs')
  .usage('Usage: $0 -t [word] -l [num]')
  .demandOption(['t','l'])
  .describe('t', 'term for search')
  .describe('l', 'result limit')
  .alias('t', 'term')
  .alias('l', 'limit')
  .example('$0 -t football -l 10', 'Get 10 twitter mention related to football')
  .help('help')
  .alias('h', 'help')
  .epilog('Copyright 2018 Felipe Santos');
  
  var argv = yargs.argv;
  if (argv.t && argv.l) {
    searchTwitterMention(argv.t, argv.l, function(list, err) {
      console.log('Result: ' + list + "\n");
    });    
  }
}
exports.searchTwitterbMention = searchTwitterMention;
exports.cli = cli;