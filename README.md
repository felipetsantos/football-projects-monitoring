## Requirements
- Nodejs
- Npm
- Github api key
- Twitter api keys

## Setup

1. Clone repository
2. Navegate to project root folder
3. Execute follow command:
```shell
npm install
```
It will donwload all project dependencies.

#### Environment variables

  - `LOGGER_LEVEL` (`'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'`), default: `info`
  - `LOGGER_ENABLED` (`'true' | 'false'`), default: `true`
  - `GITHUB_TOKEN`
  - `TWITTER_CONSUMER_KEY`
  - `TWITTER_CONSUMER_SECRET`
  - `TWITTER_ACCESS_TOKEN_KEY`
  - `TWITTER_ACCESS_TOKEN_SECRET`

  Create a .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE. Example:

  ```plain-text
 LOGGER_LEVEL=error
 LOGGER_ENABLED=true
 GITHUB_TOKEN=apigithubtoken
 TWITTER_CONSUMER_KEY=
 TWITTER_CONSUMER_SECRET=
 TWITTER_ACCESS_TOKEN_KEY=
 TWITTER_ACCESS_TOKEN_SECRET=
  ```

## Run

### Main application
1. Replace the variable values inside `.env` file
2. From project root folder, execute follow command:

``` shell
bin/football-projects-monitoring
```

### Component search github repositories

For search github repositories related to a term, excute follow command:

``` shell
bin/search-github-repositories -t football -l 10
```
or follow command for help:

``` shell
bin/search-github-repositories -h
```

### Component search twitter mention

For search twitter mention related to a term, execute follow command:

``` shell
bin/search-twitter-mention -t football -l 10
```
or follow command for help:

``` shell
bin/search-twitter-mention -h
```