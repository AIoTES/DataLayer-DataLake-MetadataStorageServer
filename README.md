# Metadata Storage server
The Metadata Storage server is a component of the Data Lake that is used for storing and retrieving metadata related to the AIoTES data analytics methods. These metadata can include trained models, prediction thresholds, etc. that are computed by the data analytics methods and can be used by them for predictions etc.

## Building
The Metadata Storage Server is a Node.js application, so there is no need to build the source code. To run the application, download the source code, move to its home directory and run the following commands:

```
npm install
npm start
```

## Deployment through Docker
The Metadata Storage Server docker-compose includes a docker image of MongoDB and an API implemented to nodejs for storing/accessing/deleting metadata to it. To deploy the application, run the following command:

```
docker-compose up -d
```

## Configuration of the docker-compose
The docker-compose provides a default configuration. To change it, access the docker-compose.yml file. By default the API will be deployed in the port 8081. Before deploying the application create the needed volume using the following command: docker volume create --name=mongodata


## Usage of the API
The API provided by the metadata storage server is documented through swagger, which is accessible in the following address: http://localhost:8081/api-docs

More details on the usage of the API can be found in the [Wiki]().



