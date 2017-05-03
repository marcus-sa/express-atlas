import mongoose, { connection as db } from 'mongoose'

const database = 'mongodb://127.0.0.1:27017/express-atlas'

mongoose.Promise = global.Promise

mongoose.connect(database)

db.on('connected', () => {
  console.log(`Connected to database: ${database}`)
}).on('error', console.error)

export default mongoose
