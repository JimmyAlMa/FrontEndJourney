const searchBar = document.getElementById('searchBar')
const category = document.getElementById('category')
const loadingText = document.getElementById('loadingText')
const movieContainer = document.getElementById('movieContainer')

async function loadMovie() {
    try {
        const APIkey = '1407fd32'
        const defaultSearch = 'star'
        
        let url = `https://www.omdbapi.com/?apikey=${APIkey}&`
        
        let response

        if (category.value === 'default') {
            response = await fetch(url + `s=${defaultSearch}`)
            
        } else {
            response = await fetch(url + `s=${category.value}`)
        }

        const data = await response.json()

        loadingText.style.display = 'none'

        if (data.Response === 'True') {
            renderMovie(data.Search)
        } else {
            loadingText.innerText = `Movie not found: ${data.Error}`
        }
    } catch (error) {
        console.log("Something wrong: " + error)
    }
}

function renderMovie(movieData) {
    movieContainer.innerHTML = ''
    movieData.forEach(movie => {
        movieContainer.innerHTML += ` 
            <div style="width: 200px; height: 300px; border: 2px solid black">
                <h2>${movie.Title}</h2>
                <h3>${movie.Year}</h3>
                <h3>${movie.Type}</h3>
                <h4>${movie.imdbID}</h4>
            </div>
        `
    })
}

loadMovie()