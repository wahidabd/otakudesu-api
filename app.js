const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./router/index')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUload = require('express-fileupload')

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUload({createParentPath: true}))

app.use('/api', router)
app.use('/', (req, res ) => {
    res.send({
        message: "Welcome to Unofficial Otakuduse Rest API",
        createdBy: "Abd. Wahid"
    })
})

app.use('/api', (req, res) => {
    res.send({
        message: 'Check our Github for update and more info',
        github: 'https://github.com/wahidabd/otakudesu-api'
    })
})

app.use('*', (req, res,) => {
    res.json({
        status: 'Path not found',
        message: 'Read documentation here https://github.com/wahidabd/otakudesu-api'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})