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

✅ DB is running and setup/migrations run


### Database
PostgreSQL accessed with Prisma
```bash
$ docker-compose up
```
- The connection string Prisma requires is made available via committed `.env` file for the sake of this app being an example project

Setup DB:

```bash
$ yarn db:migrate-dev
```

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

### Test

```bash
# unit tests
$ yarn test
```
### Integration Tests
🚨 Currently, Integration tests will reset the development DB. Feel free to re-seed data after running tests with `yarn db:seed`. I am happy to talk through what an ideal integration testing environment setup would look like.

With dev server and DB running:
```bash
$ yarn test:integration

```

### Exception Handling

Global Exception handler is setup but API is currently lacking customised and specific error response handling. I would prefer to build a custom error handler that is incorporated with Prismas error messages where relevent for client.

### Logging

TODO
