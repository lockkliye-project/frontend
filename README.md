# Scrumbag

## Content

- [1. Dependencies](#dependencies)<br>
- [2. Prerequisites](#prerequisites)<br>
- [3. Installation](<#installation-(for-development)>)<br>
  - [3.1 Locally](<##locally-(with-yarn)>)<br>
  - [3.2 With docker-compose](##with-docker-compose)<br>

## Dependencies

- [NodeJS](http://www.dropwizard.io/1.0.2/docs/) - Used for testing locally and installing yarn
- [yarn](https://maven.apache.org/) - Dependency Management
- [react](https://github.com/facebook/react) - The web-framework used
- [less](http://lesscss.org/) - Used to write the stylesheets
- [Easy LESS](https://github.com/mrcrowl/vscode-easy-less) - Visual Studio Code extension used to compiled .less files to .css
- [Docker](https://www.docker.com/) -
- [Docker-compose](https://docs.docker.com/compose/) -

## Prerequisites

If you want to install and/or deploy the application locally you're going to need:

- NodeJS with npm _(to install yarn)_
- yarn
- NGINX

If you want to install and/or deploy the application with docker-compose you just need to install the [Docker Application for Windows](https://docs.docker.com/v17.12/docker-for-windows/install/) or [Docker App for Mac](https://docs.docker.com/v17.12/docker-for-mac/install/).<br>
For Linux-distributions you're going to need to consult the [installation-guide](https://docs.docker.com/v17.12/install/#server).

To correctly follow steps the below, first clone this repository and switch to the root-directory.

```
$ git clone https://github.com/arsonite/scrumbag.git

$ cd scrumbag
```

## Installation _(for development)_

### Locally _(with yarn)_

```
$ yarn install
```

### With docker-compose

#### On Windows

```
$ docker-compose build
```

## Authors

- **Burak Günaydin** - _Initial and continuous work_ - [arsonite](https://github.com/arsonite)

## License

MIT License (c)
