module.exports.dbConnect = ()=>{
  const mon = require('mongoose')
  const pw = 'F!n@nc3' //TODO: add this to ENV

  mon.connect(`mongodb://<dbuser>:<dbpassword>@ds123664.mlab.com:23664/finance-app`, { user:'dba-admin', pass: pw, useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

  const db = mon.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', ()=> console.log(`we're in!!!`))
}