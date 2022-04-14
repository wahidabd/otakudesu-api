const express = require('express')
const router = express.Router()
const MainController = require('../controllers/main')

router.get('/home', MainController.home)
router.get('/complete/:page', MainController.completeAnimeList)
router.get('/ongoing', MainController.onGoingAnimeList)

module.exports = router