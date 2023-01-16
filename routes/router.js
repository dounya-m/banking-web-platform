const express = require('express')
const router = express.Router()
const base = '/api/banka/'

router.use(`${base}user`, require('./user/userRoutes'))
router.use(`${base}compte`, require('./compte/compteRoute'))
router.use(`${base}admin`, require('./admin/adminRoutes'))

module.exports = router