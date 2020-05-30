window.addEventListener('load', start)

let red = null, green = null, blue = null, divSquare = null
let redInput = null, greenInput = null, blueInput = null, attributeInput = null

function start() {
    function collect() {
        red = document.querySelector('#red')
        green = document.querySelector('#green')
        blue = document.querySelector('#blue')
        redInput = document.querySelector('#redInput')
        greenInput = document.querySelector('#greenInput')
        blueInput = document.querySelector('#blueInput')
        divSquare = document.querySelector('.square')
    }

    function inputSizeAndAttribute() {
        redInput.size = 1
        greenInput.size = 1
        blueInput.size = 1
        
        redInput.setAttribute("disabled", "disabled")
        greenInput.setAttribute("disabled", "disabled")
        blueInput.setAttribute("disabled", "disabled")         
    }
    
    function initialValues() {
        red.value = 0
        green.value = 0
        blue.value = 0
        redInput.value = red.value
        greenInput.value = green.value
        blueInput.value = blue.value
    }

    function setUpSquare(r, g, b) {
        divSquare.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
    }

    function changeColor(event) {
        var elementValue = event.target.value
        var colorId = event.target.id

        switch(colorId) {
            case 'red':
                redInput.value = elementValue
                break
            case 'green':
                greenInput.value = elementValue
                break
            case 'blue':
                blueInput.value = elementValue
                break
            default:
                break
        }
        
        setUpSquare(redInput.value, greenInput.value, blueInput.value)
    }

    collect()
    inputSizeAndAttribute()
    initialValues()
    setUpSquare(redInput.value, greenInput.value, blueInput.value)

    red.addEventListener('change', changeColor)
    green.addEventListener('change', changeColor)
    blue.addEventListener('change', changeColor)

}
