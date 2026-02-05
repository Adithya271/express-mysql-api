const db = require("../config/db")

exports.getAll = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM barang")
  res.json(rows)
}

exports.create = async (req, res) => {
  const { nama, harga } = req.body
  await db.query(
    "INSERT INTO barang (nama, harga) VALUES (?,?)",
    [nama, harga]
  )
  res.json({ message: "Barang created" })
}
