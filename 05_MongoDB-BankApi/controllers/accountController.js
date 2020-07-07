import { db } from '../models/connect.js'
import { promises } from 'fs'

const Account = db.account
const { writeFile, readFile} = promises

const insertMany = async (req, res) => {
    try {
        const data = await readFile('./accounts.json', 'utf-8')
        const accounts = await JSON.parse(data)
    
        accounts.forEach( async (account) => {
            const client = await new Account(account)
            client.save()
          })
          res.send('Success to insert Json File.')
    } catch(error) {
        res.send('Error to Insert Json. Could not find json file. ' + error.message)
    }
}

const findAll = async (req, res) => {
    try {
        const account = await Account.find({})
        
        if (account.length === 0) {
            res.send('No Data to load.')
            return
        }
        
        res.send(account)
    } catch (error) {
        res.send('Error to load Accounts. ' + error.message)
    }
}

const insertOne = async (req, res) => {
    const account = new Account ({
        agencia: req.body.agencia,
        conta: req.body.conta,
        name: req.body.name,
        balance: req.body.balance,
    })

    try {
        const data = await account.save()

        res.send(`New Account Inserted. ${data}`)
    } catch (error) {
        res.send('Fail to insert new Account. ' + error.message)
    }
    
}

const incrementBalance = async (req, res) => {
    try {
        const agency = req.body.agencia
        const account =req.body.conta
        const balance = req.body.balance

        if(balance <= 0) {
            res.send('The Balance cannot be incremented.')
            return
        }

        const data = await Account.findOneAndUpdate({agencia: agency, conta: account}, {$inc: {balance: balance}}, {new: true})
        
        if(!data) {
            res.send('Agency or Account not found.')
            return
        }

        res.send(`New Balance: $ ${data.balance}`)
    } catch(error) {
        res.send('Fail to increment balance. ' + error.message)
    }
    
}

const decrementBalance = async (req, res) => {
    try {
        const agency = req.body.agencia
        const account = req.body.conta

        const data = await Account.findOne({agencia: agency, conta: account})
        
        if(!data) {
            res.send('Agency or Account not found.')
            return
        }

        const value = req.body.balance

        if(value <= 0) {
            res.send('The Balance cannot be decremented.')
            return
        }

        const tax = 1
        const withdraw = data.balance - value - tax

        if(withdraw < 0) {
            res.send('No Sufficient balance to proceed.')
            return
        }

        const id = data.id
        
        const newData = await Account.findByIdAndUpdate({_id:id}, {$inc: {balance: (- value - tax)}}, {new:true})
        
        res.send(`New Balance: $ ${newData.balance}`)
    } catch(error) {
        res.send('Fail to decrement balance. ' + error.message)
    }
}

const checkBalance = async (req, res) => {
    try {
        const agency = req.body.agencia
        const account = req.body.conta
       
        const data = await Account.findOne({ agencia: agency, conta: account }, { _id: 0, balance: 1 })
        
        if(!data) {
            res.send('Agency or Account not found.')
            return
        }
        res.send(`Total Balance: $ ${data.balance}`)
    } catch(error) {
        res.send('Fail to check balance.' + error.message)
    }
}

const deleteOne = async (req, res) => {
    try {
        const agency = req.body.agencia
        const account = req.body.conta
        const data = await Account.findOneAndDelete({agencia: agency, conta: account})
        
        if(!data) {
            res.send('Agency or Account not found.')
            return
        }
        const agencyCount = await Account.count({agencia: agency})
        
        res.send(`Total: ${agencyCount} Accounts`)
    } catch(error) {
        res.send('Fail to check balance.' + error.message)
    }
}

const transferBalance = async (req, res) => {
    try {
        const from = req.body.contaOrigem
        const to = req.body.contaDestino

        const accountFrom = await Account.findOne({conta: from})

        if(!accountFrom) {
            res.send('Origin Account not found.')
            return
        }
        
        const accountTo = await Account.findOne({conta: to})
        
        if(!accountTo) {
            res.send('Destiny Account not found.')
            return
        }

        const value = req.body.value
        
        if(value <= 0) {
            res.send('The Balance cannot be used.')
            return
        } else {
            let tax = 0
    
            if(accountFrom.agencia !== accountTo.agencia) {
                tax = 8
            }
    
            const transfer = accountFrom.balance - value - tax
    
            if(transfer < 0) {
                res.send('No Sufficient balance to proceed')
                return
            }
    
            const newAccountFrom = await Account.findOneAndUpdate({conta: from}, {$inc: {balance: - value - tax }}, {new:true})
            const newAccountTo = await Account.findOneAndUpdate({conta: to}, {$inc: {balance: value}})
    
            res.send(`Origi Account - Total Balance: $ ${newAccountFrom.balance}`)
        }
    } catch(error) {
        res.send('Fail to transfer balance.' + error.message)
    }
}

const averageAgency = async (req, res) => {
    try {
        const agency = req.body.agencia

        const data = await Account.aggregate([{$match: {agencia: agency}}, {$group: {_id: null, average: {$avg: "$balance"}}}])
        
        if(data.length === 0) {
            res.send('Agency not found.')
            return
        }

        res.send(data)
    } catch(error) {
        res.send('Fail to check average.' + error.message)
    }
}


const lessBalance = async (req, res) => {
    try {
        const value = req.body.amount

        const accounts = await Account.find({balance: {$lt: value}}, {_id:0}).sort({balance:1})

        if(accounts.length === 0) {
            res.send('Amount is too low to proceed.')
            return
        }
        
        res.send(accounts)
    } catch(error) {
        res.send('Fail to show accounts.' + error.message)
    }
}

const moreBalance = async (req, res) => {
    try {
        const value = req.body.amount
        
        const accounts = await Account.find({balance: {$gt: value}}, {_id:0}).sort({balance:-1, name:1})
        
        if(accounts.length === 0) {
            res.send('Amount is too high to proceed.')
            return
        }

        res.send(accounts)
    } catch(error) {
        res.send('Fail to show accounts.' + error.message)
    }
}

const privateAgency = async (req, res) => {
    try {
        const agencies = await Account.distinct("agencia")
        const newAgency = 99
        
        const clients = agencies.map(async (agency) => {
            const client = await Account.find({agencia: agency}).sort({balance: -1}).limit(1)
            
            client[0].agencia = newAgency;
            await client[0].save()
        })

        await Promise.all(clients)
         
        const specialClients = await Account.find({agencia: 99})
        
        res.send(specialClients)
    } catch(error) {
        res.send('Fail to create new agency.' + error.message)
    }
}

const deleteAll = async (req, res) => {
    try {
        const accounts = await Account.deleteMany({})
        
        res.send('All data deleted.')
    } catch(error) {
        res.send('Fail to Delete All.' + error.message)
    }
}

export default { insertMany, findAll, insertOne, incrementBalance, decrementBalance, checkBalance, deleteOne, transferBalance, averageAgency, lessBalance, moreBalance, privateAgency, deleteAll }
