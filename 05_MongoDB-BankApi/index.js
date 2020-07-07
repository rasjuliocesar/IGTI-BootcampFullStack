import express from 'express'
import { db } from './models/connect.js'
import { accountRouter } from './routes/accountRouter.js'

(async () => {
    try {
        await db.mongoose.connect(db.url,
            {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch(error) {
        console.log('Fail to connect to MongoDB.')
    }
})()

const app = express()
app.use(express.json())

app.use(accountRouter)

//Test
app.get('/', (req, res) => {
    res.send('Bank API test with Insomnia')
})

app.listen(process.env.PORT, () => {
    console.log('Bank API Started.')
})
