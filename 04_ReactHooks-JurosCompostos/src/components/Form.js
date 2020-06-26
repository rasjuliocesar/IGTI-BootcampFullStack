import React from 'react'

export default function Form({ initialAmount, initialTaxRate, initialMonths, changeAmount, changeTax, changeMonth }) {

    const handleInputAmount = (event) => {
        let amountValue = Number(event.target.value)
        changeAmount(amountValue)
    }
        
    const handleInputTaxRate = (event) => {
        let taxRateValue = Number(event.target.value)
        changeTax(taxRateValue)
    }

    const handleInputMonth = event => {
        let monthValue = Number(event.target.value)
        changeMonth(monthValue)
    }

    return (
        <div style={styles.flexRow}>
            <div className='input-field'>
                <input id='inputAmount' type='number' value={initialAmount} onChange={handleInputAmount} />
                <label htmlFor='inputAmount' className='active'>
                    Montante Inicial:
                </label>
            </div>
            <div className='input-field'>
                <input id='inputTaxRate' type='number' value={initialTaxRate} step='0.1' onChange={handleInputTaxRate} />
                <label htmlFor='inputTaxRate' className='active'>
                    Taxa de Juros Mensal: 
                </label>
            </div>
            <div className='input-field'>
                <input id='inputMonth' type='number' value={initialMonths} onChange={handleInputMonth} />
                <label htmlFor='inputMonth' className='active'>
                    Período (meses):
                </label>
            </div>
        </div>
    )
}

const styles = {
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        margin: '5px',
        borderRadius: '20px',
        border: '1px solid rgba(121, 175, 172, 0.3)',
    },
}
