const TODO = require("../models/todo")
const createError = require('http-errors');


async function getAllTodos(req, res) {
    try {
        const allDbTodos = await TODO.find({});

        // If there are no todos found, return a 404 Not Found status
        if (!allDbTodos.length) {
            return res.status(404).json({ error: "No todos found" });
        }

        // Return a 200 OK status along with the list of todos
        // return res.status(200).json({ success: true, todos: allDbTodos, length: allDbTodos.length });
        return res.status(200).json(allDbTodos);
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error fetching todos:", error);

        // Return a generic 500 Internal Server Error response for unexpected errors
        return res.status(500).json({ error: "Failed to fetch todos. Please try again later." });
    }
}

async function createNewTodo(req, res) {
    try {
          // Validate input
    // const { name, description, price } = req.body;
    // if (!name || !description || !price) {
    //   return res.status(400).json({ error: 'Missing required fields' });
    // }
    // Create new product
    // const product = new Product({
        // name,/
        // description,
        // price,
    //   });
  
      // Save product to the database
    //   await product.save();

        const newTodo = req.body

        const todo = await TODO.create(newTodo);

        // res.status(201).json({ status: "success", data: todo });
        res.status(201).json(todo);

    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error creating new todo:", error);

        // Handle specific MongoDB validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: "Validation error. Please provide valid data." });
        }

        // For other unexpected errors, return a generic 500 Internal Server Error response
        return res.status(500).json({ error: "Failed to create todo. Please try again later." });
    }
}

async function getTodoById(req, res) {
    //Get The Todo by Id
    const id = req.params.id;
    try {
        const todo = await TODO.findById(id)
        if (!todo) {
            //  return res.status(404).json({ error: "Todo not Found" }) 
            throw createError(404, 'Todo does not exist.');
        }
        // return res.status(200).json({
        //     status: 'success',
        //     message: 'Todo successfully',
        //     data: todo
        // });
        res.status(201).json(todo);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Todo id'));
            return;
        }
        next(error);
    }

}

async function updateTodoById(req, res) {
    //Edit Todo
    try {
        const id = req.params.id;
        const updates = req.body;
        const options = { new: true };

        const todo = await TODO.findByIdAndUpdate(id, updates, options);
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        // return res.json({ message: 'Todo updated successfully', Todo: todo });
        res.status(201).json(todo);

    } catch (error) {
        console.error("Error updating todo:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteTodoById(req, res) {
    /// Delete Todo
    const id = req.params.id;
    try {
        const todo = await TODO.findByIdAndDelete(id)
        if (!todo) {
            //  return res.status(404).json({ error: "Todo not Found" })
            throw createError(404, 'Todo does not exist.');
        }
        // return res.json({ status: "successfully Deleted" })
        // return res.status(200).json({   
        //     status: 'success',
        //     message: 'Todo deleted successfully',
        //     data: null
        // });
        res.status(201).json(todo);
    } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
            next(createError(400, 'Invalid Todo id'));
            return;
        }
        next(error);

    }
    // todo.remove()
}

module.exports = {
    getAllTodos,
    getTodoById,
    updateTodoById,
    deleteTodoById,
    createNewTodo
}

/*
async function createNewTodo(req, res) {
    //Create New Todo
    const body = req.body;
    if (!body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(404).json({ msg: "all fields are Required! " })
    }

    const result = await TODO.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender,
        job_title: body.job_title
    })

    console.log(result)
    return res.status(201).json({msg:"Success",id:result._id})
}
*/

// app.put('/api/v1/todos/:id', async (req, res) => {
//     let todo = await Todo.findById(req.params._id)
//     todo = await Todo.findByIdAndUpdate(req.params._id,req.body,{new:true,useFindAndModify:true,runValidators})
//     res.status(200).json({
//         success: true,
//         todo
//     })
// })

