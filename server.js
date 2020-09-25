var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');


// Initialize application and libraries
// -----------------------------------------------------------------------------------

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// Create API
// -----------------------------------------------------------------------------------

//var dbUrl = "mongodb://localhost:27017";
var dbUrl = "mongodb://mongo:27017";

app.post('/test', function(req, res) {
	res.set('Content-Type', 'application/json');
	res.end(JSON.stringify({message: "success"}));
});

app.post('/dbtest', function(req, res) {
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("myNewDatabase");
		dbo.collection("myCollection").find({}).toArray(function(err, result) {
			if (err) {
				res.end(JSON.stringify({error: err}));
				return;
			}
			res.end(JSON.stringify(result));
			db.close();
		});
	});
});


//create model
app.post('/api/models', function(req, res) {
	let model = req.body;
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("metadata_storage");

		// check if model already exists
		dbo.collection("models").findOne(
			{"modelID": model.modelID},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}
				if (result) {
					res.end(JSON.stringify({message: `A model with modelID '${model.modelID}' already exists.`}));
					db.close();
				}
				else {
					dbo.collection("models").insertOne(model, function(err, result) {
						if (err) {
							res.end(JSON.stringify({error: err}));
							return;
						}
						res.end(JSON.stringify({message: "The model was created successfully"}));
						db.close();
					});
				}
			}
		);
	});
});


//get model by id
app.get('/api/models/:id', function(req, res) {
	var id = req.params.id;
	var query = "{\"modelID\": \""+id+"\"}"
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("metadata_storage");
		dbo.collection("models").findOne(JSON.parse(query), function(err, result) {
			if (err) {
				res.end(JSON.stringify({error: err}));
				return;
			}
			res.end(JSON.stringify(result));
			db.close();
		});
	});
});

//get all models
app.get('/api/models', function(req, res) {
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("metadata_storage");
		dbo.collection("models").find({}).toArray(function(err, result) {
			if (err) {
				res.end(JSON.stringify({error: err}));
				return;
			}
			res.end(JSON.stringify(result));
			db.close();
		});
	});
});

//update model
app.put('/api/models', function(req, res) {
	let query = req.body;
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("metadata_storage");

		let setObj = {};
		for (param in query.modelParams) {
			setObj["modelParams." + param] = query.modelParams[param];
		}

		dbo.collection("models").updateOne(
			{"modelID": query.modelID},
			{$set: setObj},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}

				// in case of success, return the updated object
				dbo.collection("models").findOne(
					{"modelID": query.modelID},
					function(err, result) {
						if (err) {
							res.end(JSON.stringify({error: err}));
							return;
						}
						res.end(JSON.stringify(result));
						db.close();
					}
				);
			}
		);
	});
});

//delete a model by id
app.delete('/api/models/:id', function(req, res) {
	var id = req.params.id;

	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("metadata_storage");
		dbo.collection("models").deleteOne(
			{"modelID": id},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}
				res.end(JSON.stringify({message: "The model was deleted successfully"}));
				db.close();
			}
		);
	});
	return;
});


//create device
app.post('/api/devices', function(req, res) {
	let device = req.body;
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("device_registry");

		// check if device already exists
		dbo.collection("devices").findOne(
			{"deviceID": device.deviceID},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}
				if (result) {
					res.end(JSON.stringify({message: `A device with deviceID '${device.deviceID}' already exists.`}));
					db.close();
				}
				else {
					dbo.collection("devices").insertOne(device, function(err, result) {
						if (err) {
							res.end(JSON.stringify({error: err}));
							return;
						}
						res.end(JSON.stringify({message: "The device was created successfully"}));
						db.close();
					});
				}
			}
		);
	});
});


//get all devices
app.get('/api/devices', function(req, res) {
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("device_registry");
		dbo.collection("devices").find({}).toArray(function(err, result) {
			if (err) {
				res.end(JSON.stringify({error: err}));
				return;
			}
			res.end(JSON.stringify(result));
			db.close();
		});
	});
});


//get device by id
app.get('/api/devices/:id', function(req, res) {
	var id = req.params.id;
	var query = "{\"deviceID\": \""+id+"\"}"
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("device_registry");
		dbo.collection("devices").findOne(JSON.parse(query), function(err, result) {
			if (err) {
				res.end(JSON.stringify({error: err}));
				return;
			}
			res.end(JSON.stringify(result));
			db.close();
		});
	});
});


//delete a device by id
app.delete('/api/devices/:id', function(req, res) {
	var id = req.params.id;
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("device_registry");
		dbo.collection("devices").deleteOne(
			{"deviceID": id},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}
				res.end(JSON.stringify({message: "The device was deleted successfully"}));
				db.close();
			}
		);
	});
});

//update device
app.put('/api/devices', function(req, res) {
	let query = req.body;
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("device_registry");

		let setObj = {};
		setObj["context"] = query.context;

		dbo.collection("devices").updateOne(
			{"deviceID": query.deviceID},
			{$set: setObj},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}

				// in case of success, return the updated object
				dbo.collection("devices").findOne(
					{"deviceID": query.deviceID},
					function(err, result) {
						if (err) {
							res.end(JSON.stringify({error: err}));
							return;
						}
						res.end(JSON.stringify(result));
						db.close();
					}
				);
			}
		);
	});
});


//create deployment
app.post('/api/deployments', function(req, res) {
	let ds = req.body;
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("deployments");

		// check if ds already exists
		dbo.collection("ds").findOne(
			{"deploymentID": ds.id},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}
				if (result) {
					res.end(JSON.stringify({message: `A deployment with id '${ds.id}' already exists.`}));
					db.close();
				}
				else {
					dbo.collection("ds").insertOne(ds, function(err, result) {
						if (err) {
							res.end(JSON.stringify({error: err}));
							return;
						}
						res.end(JSON.stringify({message: "The deployment was created successfully"}));
						db.close();
					});
				}
			}
		);
	});
});


//get all deployments
app.get('/api/deployments', function(req, res) {
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("deployments");
		dbo.collection("ds").find({}).toArray(function(err, result) {
			if (err) {
				res.end(JSON.stringify({error: err}));
				return;
			}
			res.end(JSON.stringify(result));
			db.close();
		});
	});
});


//get deployment by id
app.get('/api/deployments/:id', function(req, res) {
	var id = req.params.id;
	var query = "{\"id\": \""+id+"\"}"
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("deployments");
		dbo.collection("ds").findOne(JSON.parse(query), function(err, result) {
			if (err) {
				res.end(JSON.stringify({error: err}));
				return;
			}
			res.end(JSON.stringify(result));
			db.close();
		});
	});
});


//delete a deployment by id
app.delete('/api/deployments/:id', function(req, res) {
	var id = req.params.id;
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("deployments");
		dbo.collection("ds").deleteOne(
			{"id": id},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}
				res.end(JSON.stringify({message: "The deployment was deleted successfully"}));
				db.close();
			}
		);
	});
});

//update deployment
app.put('/api/deployments', function(req, res) {
	let query = req.body;
	
	res.set('Content-Type', 'application/json');
	MongoClient.connect(dbUrl, {useNewUrlParser: true}, function(err, db) {
		if (err) {
			res.end(JSON.stringify({error: err}));
			return;
		}
		var dbo = db.db("deployments");

		let setObj = {};
		setObj["context"] = query.context;

		dbo.collection("ds").updateOne(
			{"id": query.id},
			{$set: setObj},
			function(err, result) {
				if (err) {
					res.end(JSON.stringify({error: err}));
					return;
				}

				// in case of success, return the updated object
				dbo.collection("ds").findOne(
					{"id": query.id},
					function(err, result) {
						if (err) {
							res.end(JSON.stringify({error: err}));
							return;
						}
						res.end(JSON.stringify(result));
						db.close();
					}
				);
			}
		);
	});
});


module.exports = app;		// for testing


// Start server
// -----------------------------------------------------------------------------------

var server = app.listen(8081, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log("Metadata storage server listening at http://%s:%s", host, port);
});
