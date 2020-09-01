const router = require('express').Router()
const {
    addTodo,
    getTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require('../controllers/todos')

router.get('/', getTodos)

router.get('/:id', getTodo)

router.post('/', addTodo)

router.put('/:id', updateTodo)

router.delete('/:id', deleteTodo)

module.exports = router
