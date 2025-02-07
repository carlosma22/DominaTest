# Domina Test

This project involves the development of an application based on a microservices architecture using NestJS, a progressive Node.js framework. The application allows for managing user information and their tasks, ensuring a scalable and modular structure.

## Prerequisites

Before running this project, make sure you have the following components installed:

- **Nodejs** >= 22.0
- **npm** >= 10.0
- **MySQL**
- **GIT**

## Project Setup

1. Clone the project repository:

    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    ```

2. Navigate to the project directory:

    ```bash
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

3. Install the packages listed in the `package.json` file:

    ```bash
    npm install
    ```

## Running the Application

After installing all the necessary dependencies and services, you can run the application using:

```bash
  npm start
```

## Running Tests

You can run the unit tests with the following command:

```bash
  npm test
```

## Running The Application Without Docker

1. Make sure you have the following prerequisites installed before getting started:

    - [Docker](https://www.docker.com/get-started)
    - [Docker Compose](https://docs.docker.com/compose/install)

2. Set up environment variables

    Create a .env file in the root of the project with the necessary environment variables.

3. Build and run the containers

    Run the following command to build the Docker images and start the containers:

    ```bash
    docker-compose up
    ```
    This command will start the services defined in the docker-compose.yml file, including the MySQL database and the Node.js application.

4. Verify the application is running

    Once the containers are up and running, you can access the application at http://localhost:3000 for the authentication microservice (auth) and at http://localhost:3001 for the task microservice (task).

5. Stop the containers

    To stop and remove the containers, you can run:

    ```bash
    docker-compose down
    ```

6. Common Issues

    - Ports in use: If you encounter port conflicts, make sure that the ports defined in docker-compose.yml are not being used by other services on your local machine.

## API Documentation

The API documentation was generated with Swagger and is available at the following routes: GET http://localhost:3000/api-docs for the authentication microservice and GET http://localhost:3001/api-docs for the task microservice.
