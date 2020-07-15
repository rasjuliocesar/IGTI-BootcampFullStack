import React from 'react'

export default function Form({ initialHeight, initialWeight, changeHeight, changeWeight }) {
    const handleInputHeight = (event) => {
        let heightValue = Number(event.target.value)
        
        changeHeight(heightValue)
    }

    const handleInputWeight = (event) => {
        let weightValue = Number(event.target.value)

        changeWeight(weightValue)
    }
    
    return (
        <div style={styles.flexRow}>
            <div className='input-field' style={styles.inputs}>
                <input id='inputHeight' type='number' min='0' step='0.01' value={initialHeight} onChange={handleInputHeight}/>
                <label htmlFor='inputHeight' className='active'>
                    Height:
                </label>
            </div>
            <div className='input-field' style={styles.inputs}>
                <input id='inputWeight' type='number' min='0' step='0.01' value={initialWeight} onChange={handleInputWeight}/>
                <label htmlFor='inputWeight' className='active'>
                    Weight:
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
        justifyContent: 'center', 
        marginTop: '40px',
        padding: '10px',
        border: '1px solid rgba(173,216,230, 0.5)',
        borderRadius: '20px',
    },
    inputs: {
        border: '1px solid rgba(255,200,180, 0.2)',
        borderRadius: '20px',
        padding: '10px',
        margin: '10px',
    }
}
