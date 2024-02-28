const mongoose = require('mongoose');

// Define the schema
const todoSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
},{timestamps:true});

// Create a model based on the schema
const TODO = mongoose.model('Todo', todoSchema);

module.exports = TODO;
