const searchInput = document.getElementById('searchBar')
const searchButton = document.getElementById('searchButton')
const country = document.getElementById('country')
const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const weather = document.getElementById('weather')
const errorMessage = document.getElementById('errorMessage')
const mainFeature = document.getElementsByClassName('mainFeature')

let celcius = true

async function loadWeather() {
    try {
        
        country.innerText = 'Country: loading...'
        city.innerText = 'City: loading...'
        temperature.innerText = 'Temperature: loading...'
        weather.innerText = 'Weather: loading...'
        
        const cityName = searchInput.value
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${CONFIG.WEATHER_API_KEY}`

        if (celcius === true) {
            url += '&units=metric'
        } else {
            url += '&units=imperial'
        }
        console.log(url)

        const response = await fetch(url)
        const data = await response.json()

        if (response.ok) {
            console.log('Getting data succes')
            errorMessage.style.display = 'none'
        } else {
            errorMessage.style.display = 'flex'
            if (response.status === 404) {
                errorMessage.innerText = `The country/city: ${cityName} not found`
            } else {
                errorMessage.innerText = 'Something wrong try again later'
            }
        }

        country.innerText = `Country: ${data.sys.country}`
        city.innerText = `City: ${data.name}`
        temperature.innerText = `Temperature: ${data.main.temp}`
        if (celcius === false) {
            temperature.innerText += ' Farenheit'
        } else {
            temperature.innerText += ' Celcius'
        }
        weather.innerText = `Weather: ${data.weather[0].description}`
    } catch (error) {
        console.log(error)
    }
}

function changeTemperature() {
    if (celcius === true) {
        celcius = false
    } else {
        celcius = true
    }
    loadWeather()
}

function changeTheme() {
    const themeButton = document.getElementById('themeButton')
    if (themeButton.textContent === 'Dark Mode') {
        themeButton.textContent = 'White Mode'
    } else {
        themeButton.textContent = 'Dark Mode'
    }
    
    document.body.classList.toggle('dark-mode')
}

function search() {
    loadWeather()
}

searchButton.disabled = true
searchInput.addEventListener('change', function(event) {
    if (searchInput.value === '') {
        searchButton.disabled = true
        searchButton.style.backgroundColor = 'red'
    } else {
        searchButton.disabled = false
        searchButton.style.background = ''
    }
})