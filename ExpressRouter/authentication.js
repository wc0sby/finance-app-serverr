module.exports.userRoute = (app, Kitten)=>{
  app.get('/user',(req,res)=>
    Kitten.find((err, kittens)=>{
      if (err) return console.error(err)
      res.json(kittens)
    })
  )
}

module.exports.userRoute2 = (app, Kitten)=>{
  app.get('/user2',(req,res)=>
    Kitten.find((err, kittens)=>{
      if (err) return console.error(err)
      res.json(kittens)
    })
  )
}

// module.exports = {userRoute, userRoute2}