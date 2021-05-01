const router = require('express').Router()
const {
    addTodo,
    getTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require('../controllers/todos')

router
    .route('/')
    .get(getTodos)
    .post(addTodo)

router
    .route('/:id')
    .get(getTodo)
    .put(updateTodo)
    .delete(deleteTodo)

module.exports = router
