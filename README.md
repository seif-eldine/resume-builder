# Resume Builder

## Development/local server

Run:

 ```bash
npm install
``` 


to install all of the needed dependencies.

Then run:

 ```bash
node app
``` 

to start the server, 
or simply use nodemon :  

```bash
nodemon app
```

Navigate to `http://localhost:3000/` to check the server.
Unless you don't have "nodemon" setup in your project / or locally, The app will automatically reload if you change any of the source files.

## Running unit tests

**Make sure to change the database connection environment variables to the local .env file variables**

Run :

```bash
npm test
```



to execute the unit tests via [Jest](https://jestjs.io/).

## How does the application run 

Once the server is up and running it creates a user in the database, with username: `user` and password : `user` which gets hashed first.

if the user goes to the **index.html**, he will face a page that asks for the *username* and *password* , he can put `user` in both to get navigated to different component that asks him to fill in the resume information in steps, each step completed updates the related record in the **postgres** database.

the API is secured with **JWT** token that is provided in each request from **client** to the **backend server**.
the unit testing has that in account as well.

# TODOS

- Using config files to save configurations based on the environment.

- Use snapshot testing in [Jest](https://jestjs.io/) to avoid hard coding the values we're testing against.

- Local tests should use in-memory database to avoid fragility of DB credentials.

- Use loggers to log the caught errors to cloud loggers or server

- Building a richer resume builder that has ability to add multiple experiences, education,  certificates and so on, as the task was a proof of concept.

- User login API should be in a separate route.

- Another approach for a better experience is to have the resume creation service publicly, however, the client communicates with the backend on each process.

- Better frontend design and better steps handling.