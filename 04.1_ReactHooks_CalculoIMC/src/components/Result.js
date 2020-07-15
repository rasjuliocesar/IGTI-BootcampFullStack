import React from 'react'

export default function Result({ imcResult }) {

    let resultColor = null

    if(imcResult <= 18.5) {
        resultColor = styles.visualResultOne
    } else if (imcResult > 18.5 && imcResult <= 24.99) {
        resultColor = styles.visualResultTwo
    } else if (imcResult > 24.99 && imcResult <= 29.99) {
        resultColor = styles.visualResultThree
    } else if (imcResult > 29.99 && imcResult <= 39.99) {
        resultColor = styles.visualResultFour
    } else {
        resultColor = styles.visualResultFive
    }

    return (
        <div className='center'>
            <table>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center'}}>IMC</th>
                        <th style={{ textAlign: 'center'}}>CLASSIFICATION</th>
                        <th style={{ textAlign: 'center'}}>OBESITY (level)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={styles.visualResultOne}>
                        <td style={{ textAlign: 'center'}}>LESS THAN 18.5</td>
                        <td style={{ textAlign: 'center'}}>SLIMMING</td>
                        <td style={{ textAlign: 'center'}}>0</td>
                    </tr>
                    <tr style={styles.visualResultTwo}>
                        <td style={{ textAlign: 'center'}}>BETWEEN 18.5 AND 24.9</td>
                        <td style={{ textAlign: 'center'}}>NORMAL</td>
                        <td style={{ textAlign: 'center'}}>0</td>
                    </tr>
                    <tr style={styles.visualResultThree}>
                        <td style={{ textAlign: 'center'}}>BETWEEN 25.0 AND 29.9</td>
                        <td style={{ textAlign: 'center'}}>SOBREPESO</td>
                        <td style={{ textAlign: 'center'}}>I</td>
                    </tr>
                    <tr style={styles.visualResultFour}>
                        <td style={{ textAlign: 'center'}}>BETWEEN 30.0 AND 39.9</td>
                        <td style={{ textAlign: 'center'}}>OBESITY</td>
                        <td style={{ textAlign: 'center'}}>II</td>
                    </tr>
                    <tr style={styles.visualResultFive}>
                        <td style={{ textAlign: 'center'}}>GREATER THAN 40.0</td>
                        <td style={{ textAlign: 'center'}}>SERIOUS OBESIDADE</td>
                        <td style={{ textAlign: 'center'}}>III</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan='3' style={{ textAlign: 'center'}}><address><a href='https://www.programasaudefacil.com.br/calculadora-de-imc'>https://www.programasaudefacil.com.br/calculadora-de-imc</a></address></td>
                    </tr>
                </tfoot>
            </table>
            <p style={resultColor}>BMI: <strong>{imcResult}</strong></p>
        </div>
    )
}

const styles = {
    visualResultOne: {
        backgroundColor: 'rgba(80, 100, 120, 0.6)',
    },
    visualResultTwo: {
        backgroundColor: 'rgba(0, 150, 0, 0.6)',
    },
    visualResultThree: {
        backgroundColor: 'rgba(255, 255, 0, 0.6)',
    },
    visualResultFour: {
        backgroundColor: 'rgba(255, 100, 0, 0.6)',
    },
    visualResultFive: {
        backgroundColor: 'rgba(255, 0, 0, 0.6)',
    }
}
