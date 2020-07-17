module.exports.dbConnect = ()=>{
  const mon = require('mongoose')
  const dotenv = require('dotenv')

  dotenv.config()

  //Use DOTENV vars to secret DB creds
  mon.connect(process.env.DB_HOST, { 
    user:process.env.DB_USER
    , pass: process.env.DB_PASS
    , useNewUrlParser: true
    , useUnifiedTopology: true
    , useCreateIndex: true
  })

  const db = mon.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', ()=> console.log(`we're in!!!`))
}