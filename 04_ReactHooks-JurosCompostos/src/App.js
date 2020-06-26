import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import Installments from './components/Installments';
import { formatNumber } from './Helpers/formatNumber'

export default function App() {
  const [ amount, setAmount ] = useState(1000)
  const [ taxRate, setTaxRate ] = useState(0.5)
  const [ months, setMonths ] = useState(1)
  const [ installments, setInstallments ] = useState([])
  
  useEffect(() => {
    calculateTaxs(amount, taxRate, months)
  }, [amount, taxRate, months])

  const  calculateTaxs = (amount, newTax, qtdMonths) => {
    let nextId = 0
    let taxList = newTax
    let newAmount
    const resultList = []
    
    if(nextId === 0) {
        nextId++
        resultList.push({
            id: nextId,
            amount: formatNumber(amount + (amount * (taxList/100))),
            taxRate: formatNumber(amount * (taxList/100)),
            months: formatNumber((amount * (taxList/100)) * 100 / amount)
        })
        newAmount = amount + (amount * (taxList/100))
        newTax = amount * (taxList/100)
    }     
    
    while((qtdMonths - 1) > 0) {
        if(nextId >= 1) {
            nextId++
            resultList.push({
                id: nextId,
                amount: formatNumber(newAmount + (newAmount * (taxList/100))),
                taxRate: formatNumber((newAmount * (taxList/100)) + newTax),
                months: formatNumber(((newAmount * (taxList/100)) + newTax)  * 100 / amount)
            })
            newTax += newAmount * (taxList/100)
            newAmount = newAmount + (newAmount * (taxList/100))
        }     
       
        qtdMonths--
    }
    setInstallments(resultList)
}

  const onChangeAmount = (newAmount) =>{
    setAmount(newAmount)
  }

  const onChangeTax = (newTaxRate) =>{
    setTaxRate(newTaxRate)
  }

  const onChangeMonth = (newMonth) =>{
    setMonths(newMonth)
  }

  return (
    <div className='container'>
      <h2 className='center'>React Hooks - Juros Compostos</h2>
      <Form initialAmount={amount} initialTaxRate={taxRate} initialMonths={months}
      changeAmount={onChangeAmount} changeTax={onChangeTax} changeMonth={onChangeMonth} />
      <Installments installments={installments} />
    </div>
  )
}
