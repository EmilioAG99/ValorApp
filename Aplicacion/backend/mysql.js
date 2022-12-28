const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '35.188.52.200',
  user: 'root',
  password: 'Baseequipos!1',
  database: 'contenido'
});
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to sql!');
  });

module.exports = connection;