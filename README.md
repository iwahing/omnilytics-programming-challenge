# Omnilytics Programming Challenge

Backend implementation to the omnilytics programming challenge using NodeJS + Express + Typescript

## Description

Packages used in this project

- express
- cors
- dotenv
- joi
- jsend
- morgan
- winston
- randomstring
- swagger-jsdoc
- swagger-ui-express
- rimraf
- eslint
- prettier
- ts-node

## API Documentation

To view the list of available APIs and their specifications, run the app and go to `localhost:7777/v1/docs` in your browser.\
This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Random routes**:
`GET /v1/random/generate` - generate\
`GET /v1/random/report` - report\
`GET /v1/random/file/:filename` - download data file\

## Getting Started

### Dependencies

- `Node: v16.4.1`
- `Npm: 7.19.1`
- `Nvm: 0.38.0` (Optional)

### Installation

Installation package

```bash
npm install
```

Running in development

Setup .env (optional)

```bash
cp .env.example .env
```

Default values in `.env.example`

```bash
NODE_ENV=DEVELOPMENT
PORT=7777
```

Start the app

```bash
npm run start
```

Building to vanilla javascript

```bash
npm run build
```

Linting:

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix
```

Testing: `Not implemented yet`

### Logging

Logs files are generated in `logs/` folder

## Version History

- 1.0.0
  - Initial backend solution release

## Future Improvement

For talking to microservicees / api calls

- axios

Adding a Database

- mysql/mongodb
- typescript-ioc

Adding Test Framework

- jest
