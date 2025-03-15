# study-app

![GitHub repo size](https://img.shields.io/github/repo-size/Labbgrupp42Dat076/labs?color=blue&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/Labbgrupp42Dat076/labs?color=darkgreen&style=flat-square) 

A simple sudy app developen in the course DAT076 - Web applications at Chalmers


# Installation
Instructions on how to install and set up the project.

## Server & Client
```sh
# Clone the repository
git clone https://github.com/Labbgrupp42Dat076/labs.git

# Install dependencies
npm install --force
```

## Docker Installation
Ensure you have docker installed as it will be used for the database. If not, follow the install instructions on [Docker's official website](https://www.docker.com/products/docker-desktop).


## Database

Once you have docker installed, you install the database using the following command:

```sh
docker run --env POSTGRES_USER=<usernane_in_your_file> --env POSTGRES_PASSWORD=<password_in_your_env_file> --publish 5432:5432 --name web_apps_db --detach postgres:17

```


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
## Starting the Application

To start the entire application from the root directory, use the following command:
```sh
npm run dev
```

It is also possible to start the different parts of the application individually:

To start the PostgreSQL database on `localhost:5432`, use the following command:
```sh
npm run database
```

To start the server, navigate to the `server` directory and use the following command:
```sh
npm run dev
```

To start the client, navigate to the `client` directory and use the following command:
```sh
npm run dev
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


# Configuration

## Server
Any necessary environment variables or configuration steps.

Create a `.env` file in the `server` directory with the following content:

```
SESSION_SECRET=your_session_secret_here
```

Replace `your_session_secret_here` with a strong, unique secret key.


## Authors 
- <a href="https://erikpersson0884.github.io/portfolio">Erik Persson</a>

- <a href="https://https://github.com/casperHansenTEOA">Casper Hansen</a>

- <a href="https://github.com/carltoreborg">Carl Toreborg</a> 
