const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer')

const pool = require('./config/database').pool;
global.logger = require('./config/log');

const port = 9001;

const HOST = '0.0.0.0';
const service = 'Node JS Backend Service';

const authorRouter = require('./routes/authorRoutes');
const bookRouter = require('./routes/bookRoutes')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/author', authorRouter);
app.use('/book', bookRouter);

var minutes = 1, the_interval = minutes * 60 * 1000;
setInterval(async function () {
    var conn;
    try {
        conn = await pool.getConnection();
        const [rows, fields] = await conn.query('SELECT sum(b.LIKE_COUNT) as LIKE_COUNT,a.FIRST_NAME,a.LAST_NAME FROM books b join author a on b.AUTHOR_ID=a.ID group by AUTHOR_ID;');
        logger.info(rows);
        if(rows.length>0){
            var arrayData = [];
            for(let i=0; i< rows.length; i++){
                var text = rows[i].FIRST_NAME+" "+rows[i].LAST_NAME+" -> "+rows[i].LIKE_COUNT;
                arrayData.push(text)
            }
            await sendEmail("recevermail@gmail.com", await arrayData)
        }
    } catch (error) {
        logger.error(error);
    } finally {
        conn.release();
    }
    
}, the_interval);

app.use((req, res, next) => {
    var requestedUrl = req.protocol + '://' + req.get('Host') + req.url;
    logger.error('Inside \'resource not found\' handler , Req resource: ' + requestedUrl);
    return res.status(404).send({ success: false, message: 'Url Not found' });
});

app.use((err, req, res, next) => {
    logger.error('Error handler:', err);
    return res.status(500).send({ success: false, message: 'Error' });
});

app.listen(port, () => {
    logger.info('Server started at ' + port);
});

//send email
function sendEmail(email, dataArray) {

    var email = email;

    var arrayItems = "";
    var n;
    for (n in dataArray) {
        var result = JSON.stringify(dataArray[n]).substring(1, JSON.stringify(dataArray[n]).length-1);
        arrayItems += "<li>" + result + "</li>";
    }

    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sender@gmail.com', // Your email id
            pass: 'sender gmail app password' // Your app password
        }
    });

    var mailOptions = {
        from: 'sender@gmail.com',
        to: email,
        subject: 'Author Like Count Details',
        html: `<h2>All Author Like Counts</h2>
              <ul>${arrayItems},</ul>`

    };

    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(info)
        }
    });
}