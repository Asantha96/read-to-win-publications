var express = require('express');
var router = express.Router();

var pool = require('../config/database').pool;

router.get('/getBookList', async function (req, res, next) {
    const API_NAME = 'getBookList get, ';
    logger.info(API_NAME + 'called');

    var conn;
    try {
        conn = await pool.getConnection();
        const [rows, fields] = await conn.query('select * from books');
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

router.post('/addBook', async function (req, res, next) {
    const API_NAME = 'addBook post, ';
    logger.info(API_NAME + 'called');
    var values = req.body;
    if(!values.ISBN_NO || !values.AUTHOR_ID || !values.TITLE || !values.CATEGORY || values.ISBN_NO === '' || values.AUTHOR_ID === ''){
        res.status(500).json("Parameters not found");
        return res.end();
    }
    var conn;
    try {
        conn = await pool.getConnection();
        var data = {
            ISBN_NO: values.ISBN_NO,
            TITLE: values.TITLE,
            CATEGORY: values.CATEGORY,
            AUTHOR_ID: values.AUTHOR_ID
        }
        const [result, fields] = await conn.query(`INSERT INTO books SET ? `, data);
        logger.info(result);
        res.status(200).json({ result: result.insertId, message: "Book registerd successfully" });
        return res.end();
    } catch (error) {
        logger.error(error);
        res.status(500).json(error.message);
        return res.end();
    } finally {
        conn.release();
    }
});

router.get('/:isbn', async function (req, res, next) {
    const API_NAME = 'getBookDetailsbyIsbn get, ';
    console.log(req.params.isbn);
    logger.info(API_NAME + 'called');
    if(!req.params.isbn || req.params.isbn === ''){
        res.status(500).json("Parameters not found");
        return res.end();
    }
    var conn;
    try {
        conn = await pool.getConnection();
        const [rows, fields] = await conn.query(`select b.*,a.FIRST_NAME as AUTHOR_NAME from books b join author a on b.AUTHOR_ID=a.ID where b.ISBN_NO = '${req.params.isbn}'`);
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

router.post('/likeBookById', async function (req, res, next) {
    const API_NAME = 'likeBookById post, ';
    logger.info(API_NAME + 'called');
    if(!req.body.BOOK_ID || req.body.BOOK_ID === ''){
        res.status(500).json("Parameters not found");
        return res.end();
    }
    var bookId = req.body.BOOK_ID;

    var conn;
    try {
        conn = await pool.getConnection();
        
        const [result, fields] = await conn.query(`UPDATE books SET LIKE_COUNT=LIKE_COUNT+${1} where ID = '${bookId}'`);
        logger.info(result);
        res.status(200).json({ message: "Like added for book" });
        return res.end();
    } catch (error) {
        logger.error(error);
        res.status(500).json(error.message);
        return res.end();
    } finally {
        conn.release();
    }
});

router.post('/likeBookByIsbn', async function (req, res, next) {
    const API_NAME = 'likeBookByIsbn post, ';
    logger.info(API_NAME + 'called');
    if(!req.body.ISBN_NO || req.body.ISBN_NO === ''){
        res.status(500).json("Parameters not found");
        return res.end();
    }
    var isbn = req.body.ISBN_NO;

    var conn;
    try {
        conn = await pool.getConnection();
        
        const [result, fields] = await conn.query(`UPDATE books SET LIKE_COUNT=LIKE_COUNT+${1} where ISBN_NO = '${isbn}'`);
        logger.info(result);
        res.status(200).json({ message: "Like added for book" });
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