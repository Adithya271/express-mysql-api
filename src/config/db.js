const mysql = require("mysql2/promise")

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "express_test_db"
})

module.exports = db
