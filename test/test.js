var chai = require('chai');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.use(chaiAsPromised);
chai.use(chaiHttp);

// describe('Unit tests', function() {
    // describe('test', function() {
        // it('should return correct output in example input', function() {
            // let input = "test_input";
			// let output = "test_output";
			// expect(output).to.eql("test_output");
        // });
    // });
// });

// var kmeans = require('../services/clustering/kmeans/kmeans');
// describe('Unit tests', function() {
//     describe('kmeans()', function() {
//         it('should return correct output in example input', function() {
//             let data = [
//                 {"x": 20.3338847898911, "y": 70.9608018911035},
//                 {"x": 26.5165713494385, "y": 46.4862383887838},
//                 {"x": 22.5405564503676, "y": 68.9679382342013},
//                 {"x": 29.9393973268233, "y": 43.4853462432036},
//                 {"x": 13.05480068866, "y": 76.3221641119346},
//                 {"x": 25.2384254905452, "y": 68.9133633755761},
//                 {"x": 23.1553508372478, "y": 60.8484183471996},
//                 {"x": 34.7867591608082, "y": 62.374536303667},
//                 {"x": 35.4109048886794, "y": 58.8987189980316},
//                 {"x": 38.5175405140372, "y": 56.1424244109387},
//                 {"x": 97.1865108432285, "y": 79.0764314181978},
//                 {"x": 68.0550425292563, "y": 68.7145731834059},
//                 {"x": 76.9587226195596, "y": 84.0134969582564},
//                 {"x": 77.8924457763679, "y": 94.2337408933988},
//                 {"x": 95.1270061424319, "y": 81.5486319091794},
//                 {"x": 60.3422905089889, "y": 75.1475592989026},
//                 {"x": 97.8872293428121, "y": 102.366600071028},
//                 {"x": 75.6921793935179, "y": 82.1061642879839},
//                 {"x": 90.3069726352579, "y": 75.0050125673137},
//                 {"x": 85.812705720906, "y": 86.1304198438951}
//             ];
//             let options = {
//                 "attributes": ["x", "y"],
//                 "nClusters": 2
//             };
//             let expectedOutput = [
//                 {"x":20.3338847898911,"y":70.9608018911035,"clusterLabel":1},
//                 {"x":26.5165713494385,"y":46.4862383887838,"clusterLabel":1},
//                 {"x":22.5405564503676,"y":68.9679382342013,"clusterLabel":1},
//                 {"x":29.9393973268233,"y":43.4853462432036,"clusterLabel":1},
//                 {"x":13.05480068866,"y":76.3221641119346,"clusterLabel":1},
//                 {"x":25.2384254905452,"y":68.9133633755761,"clusterLabel":1},
//                 {"x":23.1553508372478,"y":60.8484183471996,"clusterLabel":1},
//                 {"x":34.7867591608082,"y":62.374536303667,"clusterLabel":1},
//                 {"x":35.4109048886794,"y":58.8987189980316,"clusterLabel":1},
//                 {"x":38.5175405140372,"y":56.1424244109387,"clusterLabel":1},
//                 {"x":97.1865108432285,"y":79.0764314181978,"clusterLabel":0},
//                 {"x":68.0550425292563,"y":68.7145731834059,"clusterLabel":0},
//                 {"x":76.9587226195596,"y":84.0134969582564,"clusterLabel":0},
//                 {"x":77.8924457763679,"y":94.2337408933988,"clusterLabel":0},
//                 {"x":95.1270061424319,"y":81.5486319091794,"clusterLabel":0},
//                 {"x":60.3422905089889,"y":75.1475592989026,"clusterLabel":0},
//                 {"x":97.8872293428121,"y":102.366600071028,"clusterLabel":0},
//                 {"x":75.6921793935179,"y":82.1061642879839,"clusterLabel":0},
//                 {"x":90.3069726352579,"y":75.0050125673137,"clusterLabel":0},
//                 {"x":85.812705720906,"y":86.1304198438951,"clusterLabel":0}
//             ];
//             let output = kmeans.kmeans(data, options);
//             expect(output).to.eventually.eql(expectedOutput);
//         });
//     });
// });


describe('Tests', function() {
	
    describe('createModel', function() {
        it('should return correct output in example input', function(done) {
            let input = {
				"modelID": "test_model_1",
				"modelParams": {
					"p": 1,
					"a": 2
				}
			};
            let expectedOutput = {"message": "The model was created successfully"};
            chai.request(server)
                .post('/createModel')
                .send(input)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.eql(expectedOutput);
                    done();
                });
        });
    });
	
	describe('getModel', function() {
        it('should return output that contains expected properties', function(done) {
            let input = {
				"modelID": "test_model_1"
			};
            chai.request(server)
                .post('/getModel')
                .send(input)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property("modelID").to.eql("test_model_1");
					expect(res.body).to.have.property("modelParams").to.eql({
						"p": 1,
						"a": 2
					});
                    done();
                });
        });
    });
});



