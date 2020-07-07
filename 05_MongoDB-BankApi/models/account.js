export default (mongoose) => {
    const accountSchema = mongoose.Schema({
        agencia: {
            type: Number,
            required: true
        },
        conta: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        balance: {
            type: Number,
            required: true,
            validate(balance) {
                if(balance < 0) {
                    throw new Error ('Error -> Balance less than $ 0,00')
                }
            }
        }
    })
    
    const Account = mongoose.model('account', accountSchema, 'account')

    return Account
} 
