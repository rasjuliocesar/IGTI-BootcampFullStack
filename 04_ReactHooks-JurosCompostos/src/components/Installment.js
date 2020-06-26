import React from 'react'

export default function Installment({ installment }) {
    const { id, amount, taxRate, months } = installment

    const valueResult = parseInt(taxRate) >= 0 ? styles.valueResultPositive : styles.valueResultNegative

    return (
        <div style={styles.flexRowResult}>
            <div style={styles.idResult}>
                {id}
            </div>
            <div style={valueResult}>
                <div>R$ {amount}</div>
                <div>R$ {taxRate}</div>
                <div>{months}%</div>
            </div>
        </div>
    )
}

const styles = {
    flexRowResult: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: '1px solid lightgray',
        borderRadius: '5px',
        padding: '5px',
        marginRight: '15px',
        marginBottom: '10px',
    },
    idResult: {
        marginRight: '15px',
        fontWeight: 'bold'
    },
    valueResultPositive: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '20px',
        color: 'green',
    },
    valueResultNegative: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '20px',
        color: 'red',
    },
}
