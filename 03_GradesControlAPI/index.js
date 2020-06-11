import express from 'express'
import { promises } from 'fs'
import gradesRoute from './routes/grades.js'

const { readFile, writeFile } = promises

const app = express()
app.use(express.json())

app.use('/grades', gradesRoute)


app.listen(3000, () => {
    console.log('API Started!')
})
