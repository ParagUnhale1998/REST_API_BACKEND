const express = require('express')
const mongoose = require('mongoose')
const todosRouter = require('./routes/todo')
const cors = require('cors'); 
const app = express()
const PORT = 3000


//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//connection
// mongoose.connect('mongodb://localhost:27017/todolist')
mongoose.connect('mongodb+srv://paragunhale1998:Yhkua19IPIoFJMGt@cluster0.edq0sid.mongodb.net/todolist')
    .then(() => console.log('mongoDb Connected')).catch((err) => console.log(err))

//Routes
app.use("/api/v1/todos",todosRouter)

// Define home page route
app.get('/', (req, res) => {
    // Define the JSON data for the home page
    const homePageData = {
        message: 'Welcome to the Todo API!',
        endpoints: {
            getAllTodos: {
                method: 'GET',
                path: '/api/v1/todos',
                description: 'Get all todos',
               
            },
            createNewTodo: {
                method: 'POST',
                path: '/api/v1/todos',
                description: 'Create a new todo',
            },
            getTodoById: {
                method: 'GET',
                path: '/api/v1/todos/:id',
                description: 'Get a todo by ID',
            },
            updateTodoById: {
                method: 'PATCH',
                path: '/api/v1/todos/:id',
                description: 'Update a todo by ID',
            },
            deleteTodoById: {
                method: 'DELETE',
                path: '/api/v1/todos/:id',
                description: 'Delete a todo by ID',
            }
        }
    };
    res.json(homePageData);
})

//Server Active
app.listen(PORT, (req, res) => {
    console.log(`server started on port ${PORT}`);
})