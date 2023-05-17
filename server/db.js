const mysql = require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "vacation",
});

con.connect(function (err) {
    if (err) {
        console.log("SQL.error: " + err.message);
        return;
    }
    console.log("connected to mysql: db = 'vacation'");
});

const myQuery = (q) => {
    return new Promise((resolve, reject) => {
        con.query(q, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = myQuery;