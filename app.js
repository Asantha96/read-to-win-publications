const express = require('express');
const cors = require('cors');

global.logger = require('./config/log');
const authorRouter = require('./routes/authorRoutes');
const bookRouter = require('./routes/bookRoutes');
const port = 9001;

const HOST = '0.0.0.0';
const service = 'Node JS Backend Service';
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//     var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
//     let log = service + ' recived request. ' + requestedUrl;
//     if (req.query && req.query.user) {
//         log = log + ', by user : ' + req.query.user
//     }
//     console.log(log);
//     next();
// });

app.use('/author', authorRouter);
app.use('/book', bookRouter);

//for invalid url
app.use((req, res, next) => {
    var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
    logger.error('Inside \'resource not found\' handler , Req resource: ' + requestedUrl);
    return res.status(404).send({ success: false, message: 'Url Not found' });
});

//other internal errors
app.use((err, req, res, next) => {
    logger.error('Error handler:', err);
    return res.status(500).send({ success: false, message: 'Error' });
});

app.listen(port, () => {
    logger.info('Server started at ' + port);
});