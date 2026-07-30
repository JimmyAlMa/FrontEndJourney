const button = document.querySelector('#button')
const outputText = document.querySelector('#outputText')

button.addEventListener('click', () => {
    let number = Math.floor(Math.random() * 3 + 1)
    
    if (number === 1) {
        outputText.textContent = 'Hey, you click the button!'
    } else if (number === 2) {
        outputText.textContent = 'Hello, you click it!'
    } else {
        outputText.textContent = 'Wow, you really click that!'
    }
})