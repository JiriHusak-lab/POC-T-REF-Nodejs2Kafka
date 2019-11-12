	//import { KafkaClient as Client, Producer, ProduceRequest } from 'apache-kafka';

// Kafka configuration
const kafkaHost = 'apache-kafka:9092';
var kafka = require('kafka-node');
var Producer = kafka.Producer;
var client = new kafka.KafkaClient('apache-kafka:9092');
//    client = kafka.KafkaClient();
//    producer = new Producer(client);
//	client = new Client({ kafkaHost }, 'my-kafka-client-001');
//const client = new kafka.KafkaClient({kafkaHost: 'apache-kafka:9092'});
// For this demo we just log client errors to the console.
var producer = new Producer(client);
var ProducerReady = false;
var WMJTopic = "wmj-topic";

client.on('error', function(error) {
  console.error(error);
});
console.error("Kafka setup done");

producer.on('ready', function () {
    console.log("Producer is ready");
    ProducerReady = true;
});
producer.on('error', function (err) {
  console.error("Problem with producing Kafka message "+err);
})

payloads = [
       { topic: WMJTopic, messages: "HAVLELUJA", partition: 0 },
];

if (ProducerReady) {
	producer.send("PISKULA", function (err, data) {
        console.log(data);
    });
} else {
        console.error("sorry, Producer is not ready yet, failed to produce message to Kafka.");
}









var express = require('express'),
    async = require('async'),
    pg = require("pg"),
    path = require("path"),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

io.set('transports', ['polling']);

var port = process.env.PORT || 4000;

io.sockets.on('connection', function (socket) {

  socket.emit('message', { text : 'Welcome!' });

  socket.on('subscribe', function (data) {
    socket.join(data.channel);
  });
});

async.retry(
  {times: 5, interval: 1000},
  function(callback) {
    //pg.connect('postgres://postgres@db/postgres', function(err, client, done) {
	pg.connect('db2-wmj://postgres@db/postgres', function(err, client, done) {
      if (err) {
        console.error("Waiting for db2");
      }
      callback(err, client);
    });
  },
  function(err, client) {
    if (err) {
      return console.error("Giving up");
    }
    console.log("Connected to db");
    getVotes(client);
  }
);

function getVotes(client) {
  client.query('SELECT vote, COUNT(id) AS count FROM votes GROUP BY vote', [], function(err, result) {
    if (err) {
      console.error("Error performing query: " + err);
    } else {
      var votes = collectVotesFromResult(result);
      io.sockets.emit("scores", JSON.stringify(votes));
    }

    setTimeout(function() {getVotes(client) }, 1000);
  });
}

function collectVotesFromResult(result) {
  var votes = {a: 0, b: 0};

  result.rows.forEach(function (row) {
    votes[row.vote] = parseInt(row.count);
  });

  return votes;
}

// publish(wmj-topic,"HAVLELUJA");

/*
function publish(topic, message) {
    // The client connects to a Kafka broker
    const client = new Client({ kafkaHost });
    // The producer handles publishing messages over a topic
    const producer = new Producer(client);

    // First wait for the producer to be initialized
    producer.on(
        'ready',
        (): void => {
            // Update metadata for the topic we'd like to publish to
            client.refreshMetadata(
                [topic],
                (err: Error): void => {
                    if (err) {
                        throw err;
                    }

                    console.log(`Sending message to ${topic}: ${message}`);
                    producer.send(
                        [{ topic, messages: [message] }],
                        (err: Error, result: ProduceRequest): void => {
                            console.log(err || result);
                            process.exit();
                        }
                    );
                }
            );
        }
    );
    
    // Handle errors
    producer.on(
        'error',
        (err: Error): void => {
            console.log('error', err);
        }
    );
}

*/














app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/views/index.html'));
});

server.listen(port, function () {
  var port = server.address().port;
  console.log('App running on port ' + port);
});
