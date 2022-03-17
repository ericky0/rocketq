const { redirect } = require('express/lib/response')
const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const password = req.body.password || null
    let isPassword
    let roomId
    let isRoom = true

    if (password === null) {
      isPassword = false
    }

    if (isPassword == false) {
      return res.render('./parts/passworddoesnotexist')
    }

    while (isRoom) {
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString())
      }

      const roomsExistIds = await db.all(`SELECT id FROM rooms `) // vai me retornar o array de ids da tabela rooms

      // retorna true se existir um id igual ao criado e false se não
      isRoom = roomsExistIds.some(roomIdExist => {
        roomIdExist === roomsExistIds
      })

      if (!isRoom) {
        // se o id não existir no banco então isRoom retornará false e o if vai executar
        // insere a sala no banco
        await db.run(
          `INSERT INTO rooms (id,password) VALUES 
          (${parseInt(roomId)}, 
          ${password})`
        )
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open(req, res) {
    const db = await Database()
    const roomId = req.params.room
    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 0`
    )
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} and read = 1`
    )
    let isNoQuestions

    if (questions.length == 0 && questionsRead.length == 0) {
      isNoQuestions = true
    }

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions
    })
  },

  async enter(req, res) {
    const db = await Database()
    const roomId = req.body.roomId || 0 // tratando um erro pra quando nada é especificado no campo de roomId, por isso o -> || 0
    const isRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
    if (isRoom == undefined) {
      res.render('./parts/roomdoesntexist')
    } else {
      console.log(isRoom)
      res.redirect(`/room/${roomId}`)
    }
    await db.close()
  }
}
