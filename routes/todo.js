const express = require('express')
const router = express.Router()
const handle = require("../controllers/todo");

router.route("/")
    .get(handle.getAllTodos)
    .post(handle.createNewTodo)

router.route('/:id')
    .get(handle.getTodoById)
    .patch(handle.updateTodoById)
    .delete(handle.deleteTodoById)

module.exports = router