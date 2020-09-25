# Metadata Storage server

The Metadata Storage Server docker-compose includes a docker image of MongoDB and an API implemented to nodejs for storing/accessing/deleting metadata to it.

## Configuration of the docker-compose
The docker-compose provides a default configuration. To change it, access the docker-compose.yml file. By default the API will be deployed in the port 8081. Before deploying the application create the needed volume using the following command: docker volume create --name=mongodata

## Deploy of the application
docker-compose up -d



## Usage of the API
The API provided by the metadata storage server is documented through swagger, which is accessible in the following address: http://localhost:8081/api-docs



### Create a model.

URL: http://localhost:8081/api/models

Method: POST

Headers: Content-Type: application/json

Body:

```
{
    "modelID": "test_model_1",
    "modelParams": {
        "a": 6,
        "b": 7
    }
}
```

Expected response:

```
{
	"message": "The model was created successfully"
}
```

or:

```
{
	"message": "A model with modelID 'test_model_1' already exists."
}
```

### Get a model.

URL: http://localhost:8081/api/models/{model_id}

Method: GET


Expected response:

```
{
	"_id": "5c544348c6393e1bd4b48039",
	"modelID": "test_model_1",
	"modelParams": {
		"a": 6,
		"b": 7
	}
}
```

### Get all models.

URL: http://localhost:8081/api/models

Method: GET


Expected response:

```
[
    {
        "_id": "5c544348c6393e1bd4b48039",
        "modelID": "test_model_1",
        "modelParams": {
            "a": 6,
            "b": 7
        }
    },{
        "_id": "5c544348sfafrereasfa065",
        "modelID": "test_model_2",
        "modelParams": {
            "a": 18,
            "b": 35
        }
    }
]
```

### Edit a model.

URL: http://localhost:8081/api/models

Method: PUT

Headers: Content-Type: application/json

Body:

```
{
    "modelID": "test_model_1",
    "modelParams": {
        "a": 45
    }
}
```

Expected response:

```
{
	"_id": "5c544306c6393e1bd4b48038",
	"modelID": "test_model_1",
	"modelParams": {
		"a": 45,
		"b": 7
	}
}
```

### Delete a model.

URL: http://localhost:8081/api/models/{model_id}

Method: DELETE


Expected response:

```
{
	"message": "The model was deleted successfully"
}
```

### Create a device.

URL: http://localhost:8081/api/devices

Method: POST

Headers: Content-Type: application/json

Body:

```
{
    "deviceID": "test_device_4",
    "context": "@prefix iotpex: <http://inter-iot.eu/GOIoTP#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . @prefix sosa: <http://www.w3.org/ns/sosa/> . @prefix act: <http://www.semanticweb.org/activage/ontologies/2018/4/activage-core#> . <Device/1_1> a iotpex:IoTDevice ; rdfs:label \"Fibaro motion sensor\"@en ; sosa:hosts <Sensor/1_1> ; sosa:hosts <Sensor/1_2> ; sosa:hosts <Sensor/1_3> . <Sensor/1_1 > a act:IlluminanceSensor . <Sensor/1_2 > a act:TemperatureSensor . <Sensor/1_3 > a act:UserOccupancySensor ."
}
```

Expected response:

```
{
    "message": "The device was created successfully"
}
```


### Get a device by id.

URL: http://localhost:8081/api/devices/{device_id}

Method: GET


Expected response:

```
{
    "_id": "5c544348c6393e1bd4b48039",
    "deviceID": "test_device_4",
    "context": "@prefix iotpex: <http://inter-iot.eu/GOIoTP#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . @prefix sosa: <http://www.w3.org/ns/sosa/> . @prefix act: <http://www.semanticweb.org/activage/ontologies/2018/4/activage-core#> . <Device/1_1> a iotpex:IoTDevice ; rdfs:label \"Fibaro motion sensor\"@en ; sosa:hosts <Sensor/1_1> ; sosa:hosts <Sensor/1_2> ; sosa:hosts <Sensor/1_3> . <Sensor/1_1 > a act:IlluminanceSensor . <Sensor/1_2 > a act:TemperatureSensor . <Sensor/1_3 > a act:UserOccupancySensor ."
}
```

### Get all devices.

URL: http://localhost:8081/api/devices

Method: GET


Expected response:

```
[
    {
        "_id": "5c544348c6393e1bd4b48039",
        "deviceID": "test_device_4",
        "context": "@prefix iotpex: <http://inter-iot.eu/GOIoTP#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . @prefix sosa: <http://www.w3.org/ns/sosa/> . @prefix act: <http://www.semanticweb.org/activage/ontologies/2018/4/activage-core#> . <Device/1_1> a iotpex:IoTDevice ; rdfs:label \"Fibaro motion sensor\"@en ; sosa:hosts <Sensor/1_1> ; sosa:hosts <Sensor/1_2> ; sosa:hosts <Sensor/1_3> . <Sensor/1_1 > a act:IlluminanceSensor . <Sensor/1_2 > a act:TemperatureSensor . <Sensor/1_3 > a act:UserOccupancySensor ."
    }
]
```

### Edit a device.

URL: http://localhost:8081/api/devices

Method: PUT

Headers: Content-Type: application/json

Body:

```
{
    "deviceID": "test_device_4",
    "context": "@prefix iotpex: <http://inter-iot.eu/GOIoTP#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . @prefix sosa: <http://www.w3.org/ns/sosa/> . @prefix act: <http://www.semanticweb.org/activage/ontologies/2018/4/activage-core#> . <Device/1_1> a iotpex:IoTDevice ; rdfs:label \"Fibaro motion sensor\"@en ; sosa:hosts <Sensor/1_1> ; sosa:hosts <Sensor/1_2> ; sosa:hosts <Sensor/1_3> . <Sensor/1_1 > a act:IlluminanceSensor . <Sensor/1_2 > a act:TemperatureSensor . <Sensor/1_3 > a act:UserOccupancySensor ."
}
```

Expected response:

```
{
	"_id": "5c544306c6393e1bd4b48038",
	"deviceID": "test_device_4",
	"context": "@prefix iotpex: <http://inter-iot.eu/GOIoTP#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> . @prefix sosa: <http://www.w3.org/ns/sosa/> . @prefix act: <http://www.semanticweb.org/activage/ontologies/2018/4/activage-core#> . <Device/1_1> a iotpex:IoTDevice ; rdfs:label \"Fibaro motion sensor\"@en ; sosa:hosts <Sensor/1_1> ; sosa:hosts <Sensor/1_2> ; sosa:hosts <Sensor/1_3> . <Sensor/1_1 > a act:IlluminanceSensor . <Sensor/1_2 > a act:TemperatureSensor . <Sensor/1_3 > a act:UserOccupancySensor ."
}
```

### Delete a device.

URL: http://localhost:8081/api/devices/{device_id}

Method: DELETE


Expected response:

```
{
	"message": "The device was deleted successfully"
}
```

### Create a deployment.

URL: http://localhost:8081/api/deployments

Method: POST

Headers: Content-Type: application/json

Body:

```
{
    "id": "test_ds_1",
    "context": "@prefix prov: <http://www.w3.org/ns/prov#>. @prefix ssn: <http://www.w3.org/ns/ssn/> . @prefix iot: <http://inter-iot.eu/GOIoTP#> . @prefix org: <http://www.w3.org/ns/org#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix sosa: <http://www.w3.org/ns/sosa/> . <Organization/1> a org:Organization ; rdfs:label “Municipality of Thessaloniki."@en . <Deployment/PX_HOME1> a ssn:Deployment ; prov:startedAtTime "2017-06-06"^^xsd:date ; iot:hasLocation "AREA[“Thessaloniki"]"^^http://www.opengis.net/ont/geosparql#wktLiteral prov:wasAssociatedWith <Organization/1> ; ssn:deployedOnPlatform <Platform/1> . <Platform/1> a sosa:Platform ; rdfs:label “Activage Platform GR 1"@en ; sosa:hosts <Device/1_1> ; sosa:hosts <Device/1_2>"
}
```

Expected response:

```
{
    "message": "The deployment was created successfully"
}
```


### Get a deployment by id.

URL: http://localhost:8081/api/deployments/{deployment_id}

Method: GET


Expected response:

```
{
    "_id": "5c544348c6393e1bd4b48039",
    "id": "test_ds_1",
    "context": "@prefix prov: <http://www.w3.org/ns/prov#>. @prefix ssn: <http://www.w3.org/ns/ssn/> . @prefix iot: <http://inter-iot.eu/GOIoTP#> . @prefix org: <http://www.w3.org/ns/org#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix sosa: <http://www.w3.org/ns/sosa/> . <Organization/1> a org:Organization ; rdfs:label “Municipality of Thessaloniki."@en . <Deployment/PX_HOME1> a ssn:Deployment ; prov:startedAtTime "2017-06-06"^^xsd:date ; iot:hasLocation "AREA[“Thessaloniki"]"^^http://www.opengis.net/ont/geosparql#wktLiteral prov:wasAssociatedWith <Organization/1> ; ssn:deployedOnPlatform <Platform/1> . <Platform/1> a sosa:Platform ; rdfs:label “Activage Platform GR 1"@en ; sosa:hosts <Device/1_1> ; sosa:hosts <Device/1_2>"
}
```

### Get all deployments.

URL: http://localhost:8081/api/deployments

Method: GET


Expected response:

```
[
    {
        "_id": "5c544348c6393e1bd4b48039",
        "id": "test_ds_1",
        "context": "@prefix prov: <http://www.w3.org/ns/prov#>. @prefix ssn: <http://www.w3.org/ns/ssn/> . @prefix iot: <http://inter-iot.eu/GOIoTP#> . @prefix org: <http://www.w3.org/ns/org#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix sosa: <http://www.w3.org/ns/sosa/> . <Organization/1> a org:Organization ; rdfs:label “Municipality of Thessaloniki."@en . <Deployment/PX_HOME1> a ssn:Deployment ; prov:startedAtTime "2017-06-06"^^xsd:date ; iot:hasLocation "AREA[“Thessaloniki"]"^^http://www.opengis.net/ont/geosparql#wktLiteral prov:wasAssociatedWith <Organization/1> ; ssn:deployedOnPlatform <Platform/1> . <Platform/1> a sosa:Platform ; rdfs:label “Activage Platform GR 1"@en ; sosa:hosts <Device/1_1> ; sosa:hosts <Device/1_2>"
    }
]
```

### Edit a deployment.

URL: http://localhost:8081/api/devices

Method: PUT

Headers: Content-Type: application/json

Body:

```
{
    "id": "test_ds_1",
    "context": "@prefix prov: <http://www.w3.org/ns/prov#>. @prefix ssn: <http://www.w3.org/ns/ssn/> . @prefix iot: <http://inter-iot.eu/GOIoTP#> . @prefix org: <http://www.w3.org/ns/org#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix sosa: <http://www.w3.org/ns/sosa/> . <Organization/1> a org:Organization ; rdfs:label “Municipality of Thessaloniki."@en . <Deployment/PX_HOME1> a ssn:Deployment ; prov:startedAtTime "2017-06-06"^^xsd:date ; iot:hasLocation "AREA[“Thessaloniki"]"^^http://www.opengis.net/ont/geosparql#wktLiteral prov:wasAssociatedWith <Organization/1> ; ssn:deployedOnPlatform <Platform/1> . <Platform/1> a sosa:Platform ; rdfs:label “Activage Platform GR 1"@en ; sosa:hosts <Device/1_1> ; sosa:hosts <Device/1_2>"
}
```

Expected response:

```
{
	"_id": "5c544306c6393e1bd4b48038",
    "id": "test_ds_1",
    "context": "@prefix prov: <http://www.w3.org/ns/prov#>. @prefix ssn: <http://www.w3.org/ns/ssn/> . @prefix iot: <http://inter-iot.eu/GOIoTP#> . @prefix org: <http://www.w3.org/ns/org#> . @prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>. @prefix sosa: <http://www.w3.org/ns/sosa/> . <Organization/1> a org:Organization ; rdfs:label “Municipality of Thessaloniki."@en . <Deployment/PX_HOME1> a ssn:Deployment ; prov:startedAtTime "2017-06-06"^^xsd:date ; iot:hasLocation "AREA[“Thessaloniki"]"^^http://www.opengis.net/ont/geosparql#wktLiteral prov:wasAssociatedWith <Organization/1> ; ssn:deployedOnPlatform <Platform/1> . <Platform/1> a sosa:Platform ; rdfs:label “Activage Platform GR 1"@en ; sosa:hosts <Device/1_1> ; sosa:hosts <Device/1_2>"
}
```

### Delete a deployment.

URL: http://localhost:8081/api/deployments/{deployment_id}

Method: DELETE


Expected response:

```
{
	"message": "The deployment was deleted successfully"
}
```