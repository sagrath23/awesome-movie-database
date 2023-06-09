# Awesome Movie Database

This is a small experiment to explore Nest.js features to build CLI applications. 

This app can run seamsly as web server or CLI application.

## Running the app
First of all, you need to get an API Key in order to use [OMDB API](https://www.omdbapi.com/apikey.aspx).

When you get the OMDB API Key, just follow these steps

### Running as a CLI locally

```bash
# create .env file based on example
$ cp .env.example .env

# replace example API Key with yours in .env
# make sure that EXEC_MODE value is cli

# build the app
$ yarn build

# check available options to use the command
$ node ./dist/main.js amdb -h

# use command without .env file
$ node ./dist/main.js amdb setup [OMDBToken]

# get movie by id
$ node ./dist/main.js amdb find -i tt6718170

# get movie by title
$ node ./dist/main.js amdb find -t "Super Mario Bros"

# print output in JSON 
$ node ./dist/main.js amdb find -t "Super Mario Bros" -f json
```

### Running as a web server
```bash
# create .env file based on example
$ cp .env.example .env

# replace example API Key with yours in .env
# make sure that EXEC_MODE value is server

# start server in dev mode
$ yarn start:dev
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Next Steps
- [X] Add Unit tests 
- [X] Add Error Handling
- [X] Add setup step to save API Key before use the CLI
- [ ] Add Github actions to run tests & deploy web service and/or publish npm package.
- [ ] Add support for IMDB API
