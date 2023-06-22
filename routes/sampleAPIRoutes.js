var express = require('express');
var router = express.Router();

var pool = require('../config/database').pool;

router.get('/sampleAwaitAPI', async function (req, res, next) {

    var conn;
    try {
        conn = await pool.getConnection();
        const [rows, fields] = await conn.query('show databases');
        res.status(200).json({ rows });
        return res.end();
    } catch (error) {
        res.status(500).json(error.message);
        return res.end();
    } finally {
        conn.release();
    }
});

module.exports = router;