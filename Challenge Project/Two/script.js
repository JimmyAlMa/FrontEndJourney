const searchBar = document.getElementById('searchBar')
const category = document.getElementById('category')
const loadingText = document.getElementById('loadingText')
const movieContainer = document.getElementById('movieContainer')


const defaultSearch = 'star'


let response

async function loadMovie() {
    try {
        loadingText.style.display = 'flex'

        const keyword = searchBar.value.trim().toLowerCase()
        const finalKeyword = keyword ? keyword : defaultSearch

        let url = `https://www.omdbapi.com/?apikey=${CONFIG.MOVIE_API_KEY}&s=${finalKeyword}`

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

let favoriteMovieId = []
function renderMovie(movieData) {
    movieContainer.innerHTML = ''
    movieData.forEach(movie => {
        movieContainer.innerHTML += ` 
            <div class="movieBox">
                <h3>${movie.Title}</h3>
                <h3>${movie.Year}</h3>
                <img src="${movie.Poster}" style="width: 75%; height: 250px">
                <button class="detailButton" data-id="${movie.imdbID}">See detail</button>
                <button class="addToFavButton" data-fav-id="${movie.imdbID}" data-fav-title="${movie.Title}">Add to favorites</button>
            </div>
        `

        const allDetailButton = document.querySelectorAll('.detailButton')
        allDetailButton.forEach(button => {
            button.addEventListener('click', async function(event) {
                const imdbID = event.target.dataset.id
                console.log('Getting id:' + imdbID)
                await showMovieDetail(imdbID)
            })
        })

        const allFavButton = document.querySelectorAll(".addToFavButton")
        allFavButton.forEach(button => {
            button.addEventListener('click', async function(event) {
                if (button.textContent === 'Add to favorites') {
                    button.textContent = 'Remove from favorite'

                    const imdbID = {id: event.target.dataset.favId}
                    console.log(`${imdbID.id} will be add to favorite`)
                    favoriteMovieId.push(imdbID)
                    console.log(favoriteMovieId)
                } else {
                    button.textContent = 'Add to favorites'

                    const targetID = event.target.dataset.favId
                    const resultID = favoriteMovieId.find(movie => movie.id.includes(`${event.target.dataset.favId}`))
                    console.log(`${resultID.id} will be delete from favorite`)

                    const index = favoriteMovieId.findIndex(movie => movie.id === targetID)
                    if (index !== -1) {
                        favoriteMovieId.splice(index, 1)
                    }
                    console.log(favoriteMovieId)
                }
            })

        })
    })
}


async function showMovieDetail(id) {
    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${CONFIG.MOVIE_API_KEY}&i=${id}`)
        const movie = await res.json()

        if (movie.Response === 'True') {
            renderMovieDetail(movie)
        }
    } catch (err) {
        console.log('Error:' + err)
    }
}

function renderMovieDetail(movie) {
    movieContainer.innerHTML = ''
    movieContainer.innerHTML += `
        <div>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title} (${movie.Year})</h2>
            <h3>Genre: ${movie.Genre}</h3>
            <h3>Director: ${movie.Director}</h3>
            <h3>Actor: ${movie.Actors}</h3>
            <h3>Plot: ${movie.Plot}</h3>
            <h3>Rating: ${movie.imdbRating}</h3>
        </div>
    `
}

async function loadFavorite() {
    movieContainer.innerHTML = ''
    try {
        for (const item of favoriteMovieId) {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${CONFIG.MOVIE_API_KEY}&i=${item.id}`)
            const movie = await res.json()

            if (movie.Response === 'True') {
                renderFavorites(movie)
            } else {
                console.log('Something wrong with' + item.id)
            }
        }
    } catch (err) {
        console.log('error: ' + err)
    }
}

function renderFavorites(movie) {
    movieContainer.innerHTML += `
        <div class="movieBox">
             <h3>${movie.Title}</h3>
            <h3>${movie.Year}</h3>
            <img src="${movie.Poster}" style="width: 75%; height: 250px">
            <button class="detailButton" data-id="${movie.imdbID}">See detail</button>
            <button class="addToFavButton" data-fav-id="${movie.imdbID}" data-fav-title="${movie.Title}">Remove from favorite</button>
        </div>
    `

    const allFavButton = document.querySelectorAll('.addToFavButton')
    allFavButton.forEach(button => {
        button.addEventListener('click', function(event) {
            const targetID = event.target.dataset.favId
            const index = favoriteMovieId.findIndex(movie => movie.id === targetID)
            if (index !== -1) {
                favoriteMovieId.splice(index, 1)
                console.log(targetID + ' has been delete from favorite')
            }

            const cardMovie = button.closest('.movieBox')
            if (cardMovie) {
                cardMovie.remove()
            }
        })
    })
}

function changeTheme() {
    document.body.classList.toggle('dark-mode')
    const themeButton = document.getElementById('themeButton')
    if (themeButton.textContent === 'Dark Mode') {
        themeButton.textContent = 'White Mode'
    } else {
        themeButton.textContent = 'Dark Mode'
    }
}

function homeButton() {
    loadMovie()
}
searchBar.addEventListener('input', loadMovie)
category.addEventListener('change', loadMovie)

loadMovie()