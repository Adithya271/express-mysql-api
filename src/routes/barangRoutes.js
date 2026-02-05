const express = require("express")
const router = express.Router()
const barang = require("../controllers/barangController")
const auth = require("../middleware/authMiddleware")

router.get("/", auth, barang.getAll)
router.post("/", auth, barang.create)

module.exports = router
