var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'Nova*427',
  database: "gestor-de*membros"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Conectado!");
})