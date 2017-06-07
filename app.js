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
            id: this.max
        }

        const fav = document.createElement('button')
        const del = document.createElement('button')
        fav.addEventListener("click", this.favorite);
        fav.textContent = "fav"
        del.addEventListener("click", this.delist)
        del.textContent = "del"

        const up = document.createElement('button')
        const down = document.createElement('button')
        up.addEventListener("click", this.moveUp.bind(this));
        up.textContent = "^"
        down.addEventListener("click", this.moveDown.bind(this))
        down.textContent = "v"

        const li = this.buildLI(film)
        li.appendChild(fav)
        li.appendChild(del)
        li.appendChild(up)
        li.appendChild(down)
        this.list.appendChild(li)
        this.films[this.max] = film.name
        this.max++
    },
    buildLI(film){
        const li = document.createElement('li')
        const text = document.createElement('span')
        text.textContent = film.name
        li.appendChild(text)
        return li
    },
    favorite(ev){
        const film = ev.target.parentElement
        if(film.hasAttribute("class")){
            film.removeAttribute("class")
        }else{
            film.setAttribute("class", "wow")
        }
    },
    delist(ev){
        ev.target.parentElement.outerHTML = ""
    },
    moveUp(ev){
        const film = ev.target.parentElement
        const id = this.films.indexOf(film.childNodes[0].textContent)
        if(id != 0){
            this.delist(ev)
            this.list.insertBefore(film, this.list.childNodes[id-1])
            const temp = this.films[id]
            this.films[id] = this.films[id-1]
            this.films[id-1] = temp
        }
    },
    moveDown(ev){
        const film = ev.target.parentElement
        const id = this.films.indexOf(film.childNodes[0].textContent)
        if(id != this.max-1){
            this.delist(ev)
            this.list.insertBefore(film, this.list.childNodes[id+1])
            const temp = this.films[id]
            this.films[id] = this.films[id+1]
            this.films[id+1] = temp
        }
    },
}

app.init({formSelector: '#film-form', listSelector: '#film-list'})