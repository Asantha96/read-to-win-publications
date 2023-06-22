// // get the client
const mysql = require('mysql2/promise');

var mysqlSettings = {
  host: 'localhost.',
  user: 'root',
  database: 'read_win_publications',
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  password: '',
};

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool(mysqlSettings);

pool.on('acquire', function (connection) {
  logger.info('Connection %d acquired', connection.threadId);
});

pool.on('enqueue', function () {
  logger.info('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  logger.info('Connection %d released', connection.threadId);
});

var getConnection = function (callback) {
  pool.getConnection(function (err, connection) {
    callback(err, connection);
  });
};

module.exports.getConnection = getConnection;
module.exports.pool = pool;


