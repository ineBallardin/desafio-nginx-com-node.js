const { isAxiosError } = require('axios');
const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
    const sql = `INSERT INTO people (name) VALUES ('Ine')`;
    connection.query(sql, (error, result) => {
        if (error) throw error

        const selectName = `SELECT name FROM people ORDER BY id DESC LIMIT 1`;
        connection.query(selectName, (selectErr, selectRes) => {
            if (selectErr) throw selectErr;

            const name = selectRes[0].name;
            res.send(`<h1>Full Cycle Rocks!</h1>\n<p>${name}</p>`);
        })
    })
});

app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
