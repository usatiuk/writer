# writer

A simple web/markdown-based note taking app

![screenshot](docs/main.png)

This is a notebook app written in typescript using koa for the backend and react+redux for the frontend.

## Getting started

### Not using docker

First, install all of the dependencies with `npm i` and `cd frontend && npm i`

You also need to create a `ormconfig.json` and `ormconfig.test.json` (only if you
want to run the tests). You can use ormconfig.example.json as an example (you
only need to change the database connection settings)

### Using docker

Open the workspace in a remote docker container using VSCode - everything should
be set up for you. You just need to rename `ormconfig.example.json` to `ormconfig.json`
Also, you need to **run database migrations** with
`npm run typeorm-dev -- migration:run`

Then start with `npm run dev` and visit http://localhost:1234 (Parcel dev server
is listening at http://localhost:1234, and koa at http://localhost:3000)

## Actually hosting this thing

The suggested way to host this is, agian, using Docker: you can find a
docker-compose example in `dockercomposeexample` folder

### Config options (for docker container)

-   `PORT` - web port

-   `TYPEORM_HOST` - mariadb hostname

-   `TYPEORM_USERNAME` - mariadb username

-   `TYPEORM_PASSWORD` - mariadb password

-   `TYPEORM_DATABASE` - mariadb database

-   `TYPEORM_PORT` - mariadb port

-   `JWT_SECRET` - JWT secret - set it to something random

-   `HTTPS` (`"yes"`/`"no"`) - whether the server enforce HTTPS or not
