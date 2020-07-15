import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import Result from './components/Result'

export default function App() {
  const [ height, setHeight ] = useState(1.00)
  const [ weight, setWeight ] = useState(20)
  const [ imcResult, setImcResult ] = useState()

  useEffect(() => {
    calculateIMC(height, weight)
  }, [height, weight])

  const calculateIMC = (height, weight) => {
    const imc = weight / (height * height)

    setImcResult(imc.toFixed(2))
  }

  const onChangeHeight = (newHeight) => {
    setHeight(newHeight)
  }

  const onChangeWeight = (newWeight) => {
    setWeight(newWeight)
  }

  return (
    <div className='container'>
      <h2 className='center'>Calculating <em><abbr title='Body Mass Index'>BMI</abbr></em> - Body Mass Index</h2>
      <hr />
      <Form initialHeight={height} initialWeight={weight} changeHeight={onChangeHeight} changeWeight={onChangeWeight} />
      <Result imcResult={imcResult} />
    </div>

  )
}
