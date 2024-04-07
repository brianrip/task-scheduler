## Task Scheduler API

#### Overview

- Framework: NestJS
- ORM: Prisma
- Testing:  unit controller tests 
- Documentation: Swagger

## Installation

```bash
$ yarn
```

## Running the app
✅ docker is installed
✅ node > v20
✅ yarn package manager (recommended)


### Database
PostgreSQL accessed with Prisma
```bash
$ docker-compose up
```
- The connection string Prisma requires is made available via committed `.env` file for the sake of this app being an example project

Seed DB:

```bash
$ yarn db:seed
```

### API

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev
```
- The API can be viewed and interacted with via Swagger at: http://localhost:3000/api#/

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

```
