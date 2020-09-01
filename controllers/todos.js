const uuid = require('uuid')

let Todos = [
    {
        id: '1',
        text: 'Node.js Todo API',
        completed: true
    }
]

const addTodo = (req, res) => {
    const { text, completed } = req.body

    if (text !== undefined && completed !== undefined) {
        const newTodo = {
            id: uuid.v4(),
            text,
            completed
        }

        Todos.push(newTodo)
        res.json(newTodo)
    } else {
        res.status(400)
        res.json({
            success: false,
            msg: 'Invalid credentials'
        })
    }
}

const getTodo = (req, res) => {
    const { id } = req.params
    const response = Todos.filter(todo => todo.id == id)[0]
    if (response) {
        res.json(response)
    } else {
        res.status(404)
        res.json({
            success: false,
            msg: 'Not Found'
        })
    }
}

const getTodos = (req, res) => {
    res.json(Todos)
}

const updateTodo = (req, res) => {
    const { id } = req.params
    const { text, completed } = req.body

    const findTodo = Todos.filter(todo => todo.id == id)[0]

    if (!findTodo) {
        res.status(404)
        res.json({
            success: false,
            msg: 'Not Found'
        })
    } else if (text !== undefined && completed !== undefined) {
        const updatedTodo = {
            text,
            completed
        }

        Todos = Todos.map(todo => 
            todo.id == id ? {...todo, ...updatedTodo} : todo
        )

        res.json(updatedTodo)
    } else {
        res.status(400)
        res.json({
            success: false,
            msg: 'Invalid credentials'
        })
    }
}

const deleteTodo = (req, res) => {
    const { id } = req.params
    Todos = Todos.filter(todo => todo.id !== id)
    res.send().status(200)
}

module.exports = { getTodos, addTodo, getTodo, updateTodo, deleteTodo }
