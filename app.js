const express = require('express');
const todosRouter = require('./routes/todo')
let app = express()


//middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


// app.use(express.static('./public'))

//Routes
app.use("/api/v1/todos",todosRouter)

module.exports = app;

