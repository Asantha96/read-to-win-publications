var express = require('express');
var router = express.Router();

var pool = require('../config/database').pool;

router.get('/getAuthorList', async function (req, res, next) {
    const API_NAME = 'getAuthorList get, ';
    logger.info(API_NAME + 'called');

    var conn;
    try {
        conn = await pool.getConnection();
        const [rows, fields] = await conn.query('select * from author');
        logger.info(rows);
        res.status(200).json({ rows });
        return res.end();
    } catch (error) {
        logger.error(error);
        res.status(500).json(error.message);
        return res.end();
    } finally {
        conn.release();
    }
});

router.post('/addAuthor', async function (req, res, next) {
    const API_NAME = 'addAuthor post, ';
    logger.info(API_NAME + 'called');
    var values = req.body;
    var conn;
    if (!values.FIRST_NAME || !values.LAST_NAME) {
        res.status(500).json("Parameters not found");
        return res.end();
    }

    var validation = new RegExp(/^[a-zA-Z ]*$/)
    if (!validation.test(values.FIRST_NAME)) {
        res.status(500).json("First name has unknown characters");
        return res.end();
    }
    if (!validation.test(values.LAST_NAME)) {
        res.status(500).json("Last name has unknown characters");
        return res.end();
    }

    try {
        conn = await pool.getConnection();
        var data = {
            FIRST_NAME: values.FIRST_NAME,
            LAST_NAME: values.LAST_NAME,
            EMAIL: values.EMAIL,
            CONTACT_NO: values.CONTACT_NO
        }
        const [result, fields] = await conn.query(`INSERT INTO author SET ? `, data);
        logger.info(result);
        res.status(200).json({ result: result.insertId, message: "Author registerd successfully" });
        return res.end();
    } catch (error) {
        logger.error(error);
        res.status(500).json(error.message);
        return res.end();
    } finally {
        conn.release();
    }
});

module.exports = router;