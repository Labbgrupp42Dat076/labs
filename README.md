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
```

# Tesing

The project uses jest for testing

```sh
# Test both frontend and backend
npm run test

# alternatively test both separetly
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

## Client

**Optional:** You can set the API URL by creating a `.env` file in the `client` directory with the following content:

```
VITE_API_URL=your_api_url_here
```

If not set, the client will default to `http://localhost:8080` for API calls.



## Authors 
- <a href="https://erikpersson0884.github.io/portfolio">Erik Persson</a>

- <a href="https://https://github.com/casperHansenTEOA">Casper Hansen</a>

- <a href="https://github.com/carltoreborg">Carl Toreborg</a> 
