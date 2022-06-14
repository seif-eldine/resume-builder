# Resume Builder

## Live Demo :

https://dalia-resume-builder-task.herokuapp.com/


Note: *This application is hosted on Heroku and the application takes a bit of time to load up*

## Development/local server

### Make sure to copy .env.example to .env to use the demo credentials

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


Run :

```bash
npm test
```



to execute the unit tests via [Jest](https://jestjs.io/).

## How does the application run 

Once the server is up and running it creates a user in the database, with username: `user` and password : `user` which gets hashed first.

When the user navigates to the application, he will face a login screen,
once the user provides the credentials he gets navigated to the service which asks the user to add the needed information.
Once he completes the steps it gets added as a record in the database **postgres**, PS: each step completed does update the related record in the database.

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

- Input should go through validation process.