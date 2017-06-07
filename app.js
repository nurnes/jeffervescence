const app = {
    init(selectors){
        this.films = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document.querySelector(selectors.formSelector).addEventListener('submit', this.addFilm.bind(this))
    },
    addFilm(ev){
        ev.preventDefault()
        const f = ev.target
        const film = {
            name: f.filmName.value,
            id: this.max+1
        }
        const fav = document.createElement('button')
        const del = document.createElement('button')
        fav.addEventListener("click", this.favorite.bind(this));
        fav.textContent = "fav"
        del.addEventListener("click", this.delist.bind(this))
        del.textContent = "del"
        const li = this.buildLI(film)
        li.appendChild(fav)
        li.appendChild(del)
        this.list.appendChild(li)
        this.films[this.max] = film
        this.max++
        console.log(this.films)
    },
    buildLI(film){
        const li = document.createElement('li')
        li.textContent = film.name
        return li
    },
    favorite(ev){
        const film = ev.target.parentElement
        console.log(film)
        if(film.hasAttribute("class")){
            film.removeAttribute("class")
        }else{
            film.setAttribute("class", "wow")
        }
    },
    delist(ev){
        ev.target.parentElement.outerHTML = ""
    },
}

app.init({formSelector: '#film-form', listSelector: '#film-list'})