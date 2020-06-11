import express from "express"
import { promises } from "fs"

const router = express.Router()
const {readFile, writeFile} = promises


//GET grades all
router.get('/', async (req, res) => {
    const resp = await readFile('./grades.json')
    const data = JSON.parse(resp)
    res.send(data)
})

//GET grades by ID
router.get('/:id', async (req, res) => {
    const resp = await readFile('./grades.json')
    const data = JSON.parse(resp)
    const gradeID = data.grades.find(grade => grade.id === parseInt(req.params.id), 10)

    if (gradeID) {
        res.send(gradeID)
    } else {
        res.send('No ID')
    }
    res.end()
})

//GET grades by Student and Subject
router.get('/:student/:subject', async (req, res) => {
    
    const student = req.params.student
    const subject = req.params.subject
    let sumValue = null

    const resp = await readFile('./grades.json')
    const data = JSON.parse(resp)
    
    data.grades.forEach(element => {
        if ((element.student === student) && (element.subject === subject)) {
            sumValue += element.value
        }
    });

    let gradeStudentSubject = { "student": student, "subject": subject, "value": sumValue }

    if (gradeStudentSubject) {
        res.send(gradeStudentSubject)
    } else {
        console.log('No Student or Subject')
        res.end()
    }
    res.end()
})

//GET grades by Subject and Type - Average
router.get('/average/:subject/:type', async (req, res) => {
    
    const type = req.params.type
    const subject = req.params.subject
    let match = null
    let value = null


    const resp = await readFile('./grades.json')
    const data = JSON.parse(resp)
    
    data.grades.forEach(element => {
        if ((element.type === type) && (element.subject === subject)) {
            match += 1
            value += element.value
        }
    });

    const average = value / match

    let gradeAverage = { "subject": subject, "type": type, "average": average  }

    if (gradeAverage) {
        res.send(gradeAverage)
    } else {
        console.log('No Subject or Type')
        res.end()
    }
    res.end()
})

//GET grades by Subject and Type - return ID
router.get('/best3/:subject/:type', async (req, res) => {
    
    const type = req.params.type
    const subject = req.params.subject
    let valuesId = []


    const resp = await readFile('./grades.json')
    const data = JSON.parse(resp)
    
    data.grades.forEach(element => {
        if ((element.type === type) && (element.subject === subject)) {
            valuesId.push({"Value": element.value, "ID": element.id})
        }
    });

    let allGrades = { "subject": subject, "type": type, "Values & ID": valuesId }

    if (allGrades) {
        res.send(allGrades)
    } else {
        console.log('No Subject or Type')
        res.end()
    }
    res.end()
})

//POST new grade
router.post('/', async (req, res) => {
    let grade = req.body

    let resp = await readFile('./grades.json')
    let data = JSON.parse(resp)

    let time = new Date()

    grade = { id: data.nextId++, ...grade, timestamp: time }
    data.grades.push(grade)

    writeFile('grades.json', JSON.stringify(data))

    res.send(grade)

    res.end()
})

//DELETE by ID
router.delete('/:id', async (req, res) => {
    let resp = await readFile('./grades.json')
    let data = JSON.parse(resp)

    let gradeID = data.grades.filter(grade => grade.id !== parseInt(req.params.id, 10))

    data.grades = gradeID

    writeFile('grades.json', JSON.stringify(data))

    res.end()
})

//PUT update
router.put('/', async (req, res) => {
    let newGrade = req.body

    let resp = await readFile('./grades.json')
    let data = JSON.parse(resp)

    let student = data.grades.findIndex(grade => grade.id === newGrade.id)

    data.grades[student] = newGrade

    writeFile('grades.json', JSON.stringify(data))
    
    res.end()
})

export default router
