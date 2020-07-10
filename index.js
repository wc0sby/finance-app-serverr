const express = require('express')
const parser = require('body-parser')
const mon = require('mongoose')

const app = express()
const port = 3001

app.use(parser.json())

mon.connect(`mongodb://<dbuser>:<dbpassword>@ds123664.mlab.com:23664/finance-app`, { user:'dba-admin', pass: pw, useNewUrlParser: true, useUnifiedTopology: true})

const db = mon.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', ()=> console.log(`we're in!!!`))

const kittySchema = new mon.Schema({
  name: String,
  // color: String
})

kittySchema.methods.speak = ()=>{
  const greeting = this.name 
    ? 'Meow name is ' + this.name
    : "I I don't have a name"
  console.log(greeting)
}

const Kitten = mon.model('Kitten', kittySchema)

const fluffy = new Kitten({ name: 'Fluffy'})
fluffy.speak()

Kitten.find((err, kittens)=>{
  if(err) return console.error(err)
  console.log(kittens)
})


//Input routes here
app.get('/',(req,res)=>res.json(
  'heeeeeeyyyyyy'
))

app.listen(port, () => console.log(`Listening on port ${port}!`))