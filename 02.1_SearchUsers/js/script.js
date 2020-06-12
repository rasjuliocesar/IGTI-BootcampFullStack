let people = []
let inputText = null
let resultLeft = null, resultRight = null
let headLeft = null, headRight = null
let totalMale = 0, totalFemale = 0

window.addEventListener('load', () => {
    headLeft = document.querySelector('#headLeft')
    headRight = document.querySelector('#headRight')
    inputText = document.querySelector('#inputText')
    resultLeft = document.querySelector('#resultLeft')
    resultRight = document.querySelector('#resultRight')
    
    
    async function fetchPeople() {
        const result = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
        const json = await result.json()
        people = json
        
        people = json.results.map(person => {
            const { name, dob, gender, picture } = person
            return {
                name: `${name.first} ${name.last}`,
                gender: gender,
                age: dob.age,
                picture: picture.thumbnail
            }
        })
    } 
    fetchPeople() 
    formState()  
    
})

function formState() {
    inputText.addEventListener('keyup', () => {
        filtering(inputText.value)
    })
}

function filtering(looking) {
    let toRender = people.filter((person) => person.name.toLowerCase().indexOf(looking) !== -1)
    
    render(toRender)
}

function render(results) { 
    headLeft.textContent = `${results.length} Usuários encontrados`
    headRight.textContent = 'Estatísticas'
    
    let leftDiv = "<div>"
    let rightDiv = "<div>"

    results.forEach(user => {
        const { name, age, picture } = user
        const personHTML = `
        <div class='flex-row'>
        <img src="${picture}"/>
        <p>${name}, ${age} anos</p>
        </div>
        `
        leftDiv += personHTML
    })

    leftDiv += "</div>"
    resultLeft.innerHTML = leftDiv


    let ages = results.reduce((accumulator, current) => {
        return accumulator + current.age
    }, 0)
    
    totalFemale = results.reduce((accumulator, current) =>
    (current.gender === 'female' ?  ++accumulator : accumulator), 0)

    totalMale = results.reduce((accumulator, current) =>
    (current.gender === 'male' ? ++accumulator : accumulator), 0)

    let totalFilter = ages / (totalFemale + totalMale)

    const personHTML = `
    <div> Sexo Masculino: ${totalMale}</div>
    <div> Sexo Feminino: ${totalFemale}</div>
    <div> Soma das Idades: ${ages}</div>
    <div> Média das Idades: ${totalFilter}</div>
    `
    rightDiv += personHTML
    
    rightDiv += "</div>"
    resultRight.innerHTML = rightDiv
    
}
