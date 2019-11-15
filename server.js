	//import { KafkaClient as Client, Producer, ProduceRequest } from 'apache-kafka';
//exports.KafkaClient = require('./lib/kafkaClient');

// Kafka configuration
console.log("000 Kafka base setup start"); //---------------------------------
const kafkaHost = 'apache-kafka:9092';

const kafka = require('kafka-node');
var Producer = kafka.Producer;
var KeyedMessage = kafka.KeyedMessage;

/*
const {
  KAFKA_HOST,
  TOPIC,
  PRODUCER_CONFIG,
  TOPIC_EVENTS,
  PUBSUB_TOPIC,
  MONGO_URL,
  MONGO_COLLECTION
} = require('./config');
*/



	
console.log("001 Kafka CLIENT base setup start");  //---------------------------------
    //client = new kafka.KafkaClient('172.21.25.217:9092','kafka-node-client'),
	//client = new kafka.Client('172.21.25.217:9092','kafka-node-client'),
	//client = new kafka.Client('apache-kafka:9092/'),
	//client = new kafka.KafkaClient();
	//client = new kafka.Client();
	//client = new Client({ kafkaHost }, 'my-kafka-client-001');
const client = new kafka.KafkaClient({kafkaHost: 'apache-kafka:9092'});
/*
const Client = kafka.KafkaClient;
const client = new Client({
        autoConnect: false,
        kafkaHost: 'apache-kafka:9092'
 });
*/

/*
const consumerGroup = new kafka.ConsumerGroupStream(
  {
    kafkaHost: KAFKA_HOST,
    groupId: 'ExampleTestGroup',
    sessionTimeout: 15000,
    protocol: ['roundrobin'],
    fromOffset: 'latest',
    asyncPush: false,
    autoCommit: false
  },
  TOPIC
);
*/

console.log("002 Kafka PRODUCER base setup start");//---------------------------------
//    producer = new Producer(client);

var mDate = new Date();
var mDateStr = mDate.toString('dddd MMM yyyy h:mm:ss');
// var tim = '13:08';
var	producer = new Producer(client),
	km = new KeyedMessage('key', 'message'),
    payloads = [
        { topic: 'wmj-topic', messages: 'fourth color is yellow. Timestamp:' + mDateStr, partition: 0 },
        { topic: 'wmj-topic', messages: 'fifth color is green. Timestamp:' + mDateStr, partition: 0 },
		{ topic: 'wmj-topic', messages: 'sixth color is BLACK. Timestamp:' + mDateStr, partition: 0 }
    ];
producer.on('ready', function () {
    producer.send(payloads, function (err, data) {
        console.log(data);
		console.log("009 Producer.on ready");
    });
	console.log("010 Producer.on ready");
});
console.log("110 Kafka base setup done");//---------------------------------

/*
console.log("115 producer.send natvrdo");//---------------------------------
    producer.send(payloads, function (err, data) {
        console.log(data);
		console.log("009 Producer.on ready");
    });
*/

	/*
	console.log("120 Will try to put message to Kafka");//---------------------------------

	payloads = [
		   { topic: WMJTopic, messages: "HAVLELUJA", partition: 0 },
	];
	producer.send(payloads, function (err, data) {
		   console.log(data);
	});
	*/
		/*
		var ProducerReady = false;
		var ClientReady = false;
		var WMJTopic = "wmj-topic";


		client.on('ready', function () {
			console.log("130 Kafka client is ready");
			ClientReady = true;
		});
		client.on('error', function(error) {
		  console.log("130 Kafka client is NOT ready"+err);
		  //console.error(error);
		});


		producer.on('ready', function () {
			console.log("140 Producer is ready");
			ProducerReady = true;
		});
		producer.on('error', function (err) {
			console.log("140 Problem with producing Kafka message "+err);
			//console.error("Problem with producing Kafka message "+err);
		})
		*/

		/*
		console.log("160 Will try to put message to Kafka");//---------------------------------
		if (ProducerReady) {
			producer.send("PISKULA", function (err, data) {
				console.log(data);
			});
		} else {
				console.error("160 Sorry, Producer is not ready yet, failed to produce message to Kafka.");
		}
		*/

		
console.log("200 COnsumer part");//---------------------------------		
 var Consumer = kafka.Consumer,
     consumer = new Consumer(
        client,
        [
            { topic: 'wmj-topic2', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );	
	

console.log("210 COnsumer part - nactu");//---------------------------------	
consumer.on('message', function (message) {
    console.log(message);
});	



console.log("300 COnsumer part");//---------------------------------
var session = require('express-session');
var Db2Store = require('connect-db2')(session);
 
var options = {
    host: 'db2-wmj',
    port: 50000,
    username: 'TESTDB',
    password: 'db234',
    database: 'TESTDB'
};
 
var sessionStore = new Db2Store(options);
//app.use(session({
//    store: sessionStore,
//    secret: 'keyboard cat'
//}));
	
	
	

// DB2 CONECT A---------------------------------------
// var ibmdb = require('ibm_db2');
/*
//ibmdb.open("DRIVER={DB2};DATABASE=TESTDB;HOSTNAME=db2-wmj;UID=testdb;PWD=db234;PORT=50000;PROTOCOL=TCPIP", function (err,
//cn ="DATABASE=dbname;HOSTNAME=hostname;PORT=port;PROTOCOL=TCPIP;UID=dbuser;PWD=xxx";
ibmdb.open("DRIVER=DB2;DATABASE=TESTDB;HOSTNAME=db2-wmj;UID=testdb;PWD=db234;PORT=50000;PROTOCOL=TCPIP", function (err, conn) {
	if (err) return console.log(err);
		conn.query('select 1 from sysibm.sysdummy1', function (err, data) {
			if (err) console.log(err);
			else console.log(data);
				 conn.close(function () {
				 console.log('done');
				});
		});
});
*/






// DB2 CONECT B---------------------------------------
/*
const db = require('/QOpenSys/QIBM/ProdData/OPS/Node6/os400/db2i/lib/db2a')

const dbconn = new db.dbconn()
dbconn.conn("*LOCAL")
const stmt = new db.dbstmt(dbconn)

const schema = process.env.LITMIS_SCHEMA_DEVELOPMENT
let sql =
'CREATE TABLE ${schema}.CUSTOMER ( \
CUSNUM NUMERIC(6, 0),            \
LSTNAM VARCHAR(50),              \
INIT CHAR(1),                    \
STREET VARCHAR(100),             \
CITY VARCHAR(100),               \
STATE CHAR(2),                   \
ZIPCOD NUMERIC(5, 0)             \
)'
stmt.exec(sql, function(result, err){
  console.log('result:' + result)

  sql = `INSERT INTO ${schema}.CUSTOMER VALUES (123,'Smith','L','123 Center','Mankato','MN',56001)`
  stmt.exec(sql, function(result,err){
    console.log('result:' + result)

    sql = `select * from ${schema}.systables WHERE TABLE_TYPE='T'`
    stmt.exec(sql, function(result,err) {
      console.log('result:' + JSON.stringify(result))
    })
  })
})
*/




// ORIGINAL APP START -------------------------------

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
