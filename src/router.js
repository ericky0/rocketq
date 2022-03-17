const express = require('express')
const { route } = require('express/lib/application')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const router = express.Router()

// index page
router.get('/', (req, res) => {
  res.render('index', { page: 'enter-room' })
})

// create-pass page
router.get('/create-pass', (req, res) => {
  res.render('index', { page: 'create-pass' })
})
// create-room page
router.post('/create-room', RoomController.create)
// room page
router.get('/room/:room', RoomController.open)
router.post('/enter-room', RoomController.enter)

router.post('/question/create/:room', QuestionController.create)
router.post('/question/:room/:question/:action', QuestionController.index)
module.exports = router
