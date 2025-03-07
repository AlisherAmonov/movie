/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict'

document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: [
      'LOGAN',
      'JUSTICE LEAGUE',
      'LA LA LAND',
      'OBSESSION',
      'SCOTT PILGRIM VS...',
    ],
  }

  const adv = document.querySelectorAll('.promo__adv img')
  const poster = document.querySelector('.promo__bg')
  const genre = poster.querySelector('.promo__genre')
  const movieList = document.querySelector('.promo__interactive-list')
  const addForm = document.querySelector('form.add')
  const addInput = addForm.querySelector('.adding__input')
  const checkbox = addForm.querySelector('[type="checkbox"]')

  addForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let newFilm = addInput.value
    const favorite = checkbox.checked

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`
      }
      if (favorite) {
        console.log('Add your favorite movie')
      }

      movieDB.movies.push(newFilm)
      sortMovies(movieDB.movies)
      createMovieList(movieDB.movies, movieList)
    }
    e.target.reset()
  })

  const deleteAdv = (arg) => {
    arg.forEach((item) => {
      item.remove()
    })
  }

  const makeChanges = () => {
    genre.textContent = 'drama'
    poster.style.backgroundImage = 'url("img/bg.jpg")'
  }

  const sortMovies = (movie) => {
    movie.sort()
  }

  function createMovieList(films, parent) {
    parent.innerHTML = ''
    sortMovies(films)

    films.forEach((film, i) => {
      parent.innerHTML += `
             <li class="promo__interactive-item">${i + 1}. ${film}
                      <div class="delete"></div>
             </li>
            `
    })
    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove()
        movieDB.movies.splice(i, 1)
        createMovieList(films, parent)
      })
    })
  }

  createMovieList(movieDB.movies, movieList)
  makeChanges()
  deleteAdv(adv)
})
