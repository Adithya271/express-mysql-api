const db = require("../config/db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  const { name, email, password } = req.body
  const hash = await bcrypt.hash(password, 10)

  await db.query(
    "INSERT INTO users (name, email, password) VALUES (?,?,?)",
    [name, email, hash]
  )

  res.json({ message: "Register success" })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  )

  if (rows.length === 0) {
    return res.status(401).json({ message: "User not found" })
  }

  const user = rows[0]
  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    return res.status(401).json({ message: "Wrong password" })
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token })
}
