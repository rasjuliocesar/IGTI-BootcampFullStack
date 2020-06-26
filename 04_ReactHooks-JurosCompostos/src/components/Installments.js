import React from 'react'
import Installment from './Installment'

export default function Installments({ installments }) {
    return (
        <div style={styles.result}>
            {installments.map((installment) => {
                return <Installment key={installment.id} installment={installment} />
            })}
        </div>
    )
}

const styles = {
    result: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        padding: '5px',
        borderRadius: '20px',
        border: '1px solid rgba(95, 6, 6, 0.3)',
    },
}
