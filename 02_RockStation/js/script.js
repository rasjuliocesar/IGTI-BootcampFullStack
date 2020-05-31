window.addEventListener('load', () => {
    let inputFrequency = document.querySelector('#inputFrequency')
    let inputRange = document.querySelector('#inputRange')
    let initialText = document.querySelector('#initialText')
    let videoStation = document.querySelector('#videoStation')
    
    function begin() {
        inputRange.setAttribute("min", "90.1")
        inputRange.setAttribute("max", "99.7")
        inputRange.setAttribute("step", "0.3")
        inputFrequency.setAttribute('disabled', 'disabled')
        
        inputRange.value = '90.1'
        inputFrequency.value = inputRange.value
    }
    
    inputRange.addEventListener('input', () => {
        let current = inputRange.value
        inputFrequency.value = current
        
        find(current)
    })

    function find(station) {
        const found = band.find(function(radio) {
            return radio.id === station
        })
        
        changeStation(found)
    }
    
    function changeStation(id) {
        if (!id) {
            initialText.textContent = 'No station available'
            videoStation.innerHTML = ''
            return
        }
        
        initialText.textContent = `${id.name}`
                
        videoStation.innerHTML = `
        <iframe src="${id.urlVideo}" frameborder="0" allow="accelerometer;
        autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`
    }
        
    begin()
})
