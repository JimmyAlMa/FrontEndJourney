const searchInput = document.getElementById('searchBar')
const country = document.getElementById('country')
const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const weather = document.getElementById('weather')

async function loadWeather() {
    try {

        country.innerText += ' loading...'
        city.innerText += ' loading...'
        temperature.innerText += ' loading...'
        weather.innerText += ' loading...'
        

        const cityName = searchInput.value
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${CONFIG.WEATHER_API_KEY}&units=metric`
        console.log(url)
        const response = await fetch(url)
        const data = await response.json()

        country.innerText = `Country: ${data.sys.country}`
        city.innerText = `City: ${data.name}`
        temperature.innerText = `Temperature: ${data.main.temp} Celcius`
        weather.innerText = `Weather: ${data.weather[0].description}`

    } catch (error) {
        console.log(error)
    }
}

function search() {
    loadWeather()
}