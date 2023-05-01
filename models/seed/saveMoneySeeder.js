if (process.env.MONGODB_URI !== 'production') {
    require('dotenv').config()
  }

const mongoose = require('mongoose')
const saveMoney = require('../saveMoney') // 載入 todo model


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < 10; i++) {
    saveMoney.create({event:`event-${i}`})
  }
  console.log('done')
})