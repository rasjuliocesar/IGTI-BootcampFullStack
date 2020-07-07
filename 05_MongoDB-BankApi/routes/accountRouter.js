import express from 'express'
import controller from '../controllers/accountController.js'

const app = express()

app.post('/', controller.insertMany)

app.get('/account', controller.findAll) 

app.post('/account', controller.insertOne)

app.put('/increment', controller.incrementBalance) 

app.put('/decrement', controller.decrementBalance) 

app.get('/check', controller.checkBalance) 

app.delete('/delete', controller.deleteOne) 

app.put('/transfer', controller.transferBalance) 

app.get('/average', controller.averageAgency) 

app.get('/less', controller.lessBalance) 

app.get('/more', controller.moreBalance) 

app.put('/private', controller.privateAgency)

app.delete('/', controller.deleteAll) 

export { app as accountRouter}
