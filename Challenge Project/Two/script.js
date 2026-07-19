const searchBar = document.getElementById('searchBar')
const category = document.getElementById('category')
const loadingText = document.getElementById('loadingText')
const movieContainer = document.getElementById('movieContainer')
const homeButton = document.getElementById('homeButton')
const favoriteButton = document.getElementById('favoriteButton')

const savedFavorites = localStorage.getItem('favoriteListLocal')
let favoriteMovieId = savedFavorites ? JSON.parse(savedFavorites) : []

movieContainer.addEventListener('click', async function(event) {
    const target = event.target

    // Detail button
    if (target.classList.contains('detailButton')) {
        const imdbID = target.dataset.id
        console.log('Get detail from the ID: ' + imdbID)
        await loadMovieDetail(imdbID)
    }

    // Favorite button
    if (target.classList.contains('addToFavButton')) {
        const imdbID = target.dataset.favId
        
        if (target.textContent === 'Add to favorites') {
            const isExist = favoriteMovieId.some(movie => movie.id === imdbID)

            if (!isExist) {
                console.log(`Add the ID: ${imdbID} to favorites`)
                favoriteMovieId.push({id: imdbID})
                target.textContent = 'Remove from favorite'

                const stringData = JSON.stringify(favoriteMovieId)
                localStorage.setItem('favoriteListLocal', stringData)
            } else {
                console.log('The ID is already exist(favorited)')
            }
        } else {
            console.log(`The ID: ${imdbID} is deleted from favorite`)
            const index = favoriteMovieId.findIndex(movie => movie.id === imdbID)
            if (index !== -1) {
                favoriteMovieId.splice(index, 1)
                
                const stringData = JSON.stringify(favoriteMovieId)
                localStorage.setItem('favoriteListLocal', stringData)
            }
            target.textContent = 'Add to favorites'
        }
    }
})

async function loadMovie() {
    const defaultSearch = 'star'
    let response

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
            loadingText.innerText = `Loading...`
        }
    } catch (error) {
        console.log("Loading...")
    }
}

function renderMovie(movieData) {
    movieContainer.innerHTML = ''
    let movieContent = ''
    movieData.forEach(movie => {
        movieContent += `
            <div class="movieBox">
                <h3>${movie.Title}</h3>
                <h3>${movie.Year}</h3>
                <img src="${movie.Poster}" style="width: 75%; height: 250px">
                <button class="detailButton" data-id="${movie.imdbID}">See detail</button>
                <button class="addToFavButton" data-fav-id="${movie.imdbID}" data-fav-title="${movie.Title}">Add to favorites</button>
            </div>
        `
    })
    movieContainer.innerHTML = movieContent
    updateFavButtonStatus()
}

async function loadMovieDetail(id) {
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

    if (favoriteMovieId.length === 0) {
        movieContainer.innerHTML = 'Your favorite is empty'
        return
    }
    try {
        for (const item of favoriteMovieId) {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${CONFIG.MOVIE_API_KEY}&i=${item.id}`)
            const movieData = await res.json()

            if (movieData.Response === 'True') {
                renderFavorites(movieData)
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
    `;

    const allFavButton = document.querySelectorAll('.addToFavButton')
    allFavButton.forEach(button => {
        button.addEventListener('click', function(event) {
            const cardMovie = button.closest('.movieBox')
            if (cardMovie) {
                cardMovie.remove()
            }
        })
    })
}

function updateFavButtonStatus() {
    const allButton = document.querySelectorAll('.addToFavButton')

    allButton.forEach(button => {
        const targetID = button.dataset.favId

        const isFavorited = favoriteMovieId.some(movie => movie.id === targetID)

        if (isFavorited) {
            button.textContent = 'Remove from favorite'
        } else {
            button.textContent = 'Add to favorites'
        }
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

homeButton.addEventListener('click', function() {
    searchBar.value = ''
    loadMovie()
})
searchBar.addEventListener('input', loadMovie)
category.addEventListener('change', loadMovie)
favoriteButton.addEventListener('click', loadFavorite)

loadMovie()