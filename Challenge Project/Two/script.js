const searchBar = document.getElementById('searchBar')
const category = document.getElementById('category')
const loadingText = document.getElementById('loadingText')
const movieContainer = document.getElementById('movieContainer')

const APIkey = '1407fd32'
const defaultSearch = 'star'


let response

async function loadMovie() {
    try {
        loadingText.style.display = 'flex'

        const keyword = searchBar.value.trim().toLowerCase()
        const finalKeyword = keyword ? keyword : defaultSearch

        let url = `https://www.omdbapi.com/?apikey=${APIkey}&s=$${finalKeyword}`

        if (category.value !== 'default') {
            url += `&type=${category.value}`
        }

        const response = await fetch(url)
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
            <div style="width: 300px; height: 400px; border: 2px solid black; display: flex; flex-direction: column; align-items: center;">
                <h3>${movie.Title}</h3>
                <h3>${movie.Year}</h3>
                <img src="${movie.Poster}" style="width: 75%; height: 250px">
            </div>
        `
    })
}

searchBar.addEventListener('input', loadMovie)
category.addEventListener('change', loadMovie)

loadMovie()