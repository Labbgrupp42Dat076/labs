# study-app

![GitHub repo size](https://img.shields.io/github/repo-size/Labbgrupp42Dat076/labs?color=blue&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/Labbgrupp42Dat076/labs?color=darkgreen&style=flat-square) 

A simple sudy app developen in the course DAT076 - Web applications at Chalmers


# Installation
Instructions on how to install and set up the project.

```sh
# Clone the repository
git clone https://github.com/Labbgrupp42Dat076/labs.git

# Install dependencies
npm install --force
```

## Docker Installation
Ensure you have docker installed as it will be used for the database. If not, follow the install instructions on [Docker's official website](https://www.docker.com/products/docker-desktop).


# Configuration
Any necessary environment variables or configuration steps.

## Server

In the `server` directory, copy the `.env.example` file or create a new `.env` file with the following content:

```
SESSION_SECRET=your_session_secret_here
DATABASE_URL=your_postgres_url_here
DATABASE_USER=your_postgres_username_here
DATABASE_PASSWORD=your_postgres_password_here
```

*Replace the example environment variable values with your unique values.*


# Usage

```sh
# Start the server in the server folder
npm run 
```
```sh
# Start the client in the client folder
npm run
```

```sh
# Start the postgres database on localhost:5432
docker run --env POSTGRES_USER=<usernane_in_your_file> --env POSTGRES_PASSWORD=<password_in_your_env_file> --publish 5432:5432 --name web_apps_db --detach postgres:17
```

# Tesing

The project uses jest for testing

```sh
# Test both frontend and backend
npm run test

# alternatively run test separetly
npm run test-server
npm run test-client

```






## Authors 
- <a href="https://erikpersson0884.github.io/portfolio">Erik Persson</a>

- <a href="https://https://github.com/casperHansenTEOA">Casper Hansen</a>

- <a href="https://github.com/carltoreborg">Carl Toreborg</a> 
