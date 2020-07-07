import mongoose from 'mongoose'
import accountModel from './account.js'

const db = {}

db.url = process.env.MONGODBURL
db.mongoose = mongoose
db.account = accountModel(mongoose)

export { db }
