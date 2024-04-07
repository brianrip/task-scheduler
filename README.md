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
```
# Integration Tests
🚨 Currently, Integration tests will reset the development DB. Feel free to re-seed data after running tests with `yarn db:seed`. I am happy to talk through what an ideal integration testing environment setup would look like.

```bash
$ yarn test:integration

```
