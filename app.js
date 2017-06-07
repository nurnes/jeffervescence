const app = {
    init(selectors){
        this.films = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        document.querySelector(selectors.formSelector).addEventListener('submit', this.addFilm.bind(this))

        /*if(localStorage.getItem("max")){
            this.max = parseInt(localStorage.getItem("max"))
        }
        if(localStorage.getItem("films")){
            this.films = JSON.parse(localStorage.getItem("films"))
        }
        if(localStorage.getItem("list")){
            this.list.innerHTML = localStorage.getItem("list")
            const favs = document.querySelectorAll(".fav")
            favs.forEach(function(value){
                value.addEventListener("click", this.favorite.bind(this))
            }, this)
            const dels = document.querySelectorAll(".del")
            dels.forEach(function(value){
                value.addEventListener("click", this.delist.bind(this))
            }, this)
            const ups = document.querySelectorAll(".up")
            ups.forEach(function(value){
                value.addEventListener("click", this.moveUp.bind(this))
            }, this)
            const downs = document.querySelectorAll(".down")
            downs.forEach(function(value){
                value.addEventListener("click", this.moveDown.bind(this))
            }, this)
        }*/
    },
    addFilm(ev){
        ev.preventDefault()
        const f = ev.target
        const film = {
            name: f.filmName.value,
            id: this.max
        }

        const fav = document.createElement('button')
        fav.setAttribute("class", "fav")
        const del = document.createElement('button')
        del.setAttribute("class", "del")
        fav.addEventListener("click", this.favorite.bind(this));
        fav.textContent = "fav"
        del.addEventListener("click", this.delist.bind(this))
        del.textContent = "del"

        const up = document.createElement('button')
        up.setAttribute("class", "up")
        const down = document.createElement('button')
        down.setAttribute("class", "down")
        up.addEventListener("click", this.moveUp.bind(this));
        up.textContent = "↑"
        down.addEventListener("click", this.moveDown.bind(this))
        down.textContent = "↓"

        const li = this.buildLI(film)
        li.appendChild(fav)
        li.appendChild(del)
        li.appendChild(up)
        li.appendChild(down)
        this.list.appendChild(li)
        this.films[this.max] = film.name
        this.max++
        localStorage.setItem("list", this.list.innerHTML)
        localStorage.setItem("films", JSON.stringify(this.films))
        localStorage.setItem("max", this.max)
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
        localStorage.setItem("list", this.list.innerHTML)
        localStorage.setItem("films", JSON.stringify(this.films))
    },
    delist(ev){ 
        const id = this.films.indexOf(ev.target.parentElement.childNodes[0].textContent)
        this.films.splice(id, 1)
        this.max--
        ev.target.parentElement.outerHTML = ""
        localStorage.setItem("list", this.list.innerHTML)
        localStorage.setItem("films", JSON.stringify(this.films))
        localStorage.setItem("max", this.max)
    },
    moveUp(ev){
        const film = ev.target.parentElement
        const id = this.films.indexOf(film.childNodes[0].textContent)
        if(id != 0){
            ev.target.parentElement.outerHTML = ""
            this.list.insertBefore(film, this.list.childNodes[id-1])
            const temp = this.films[id]
            this.films[id] = this.films[id-1]
            this.films[id-1] = temp
            localStorage.setItem("list", this.list.innerHTML)
            localStorage.setItem("films", JSON.stringify(this.films))
        }
    },
    moveDown(ev){
        const film = ev.target.parentElement
        const id = this.films.indexOf(film.childNodes[0].textContent)
        if(id != this.max-1){
            ev.target.parentElement.outerHTML = ""
            this.list.insertBefore(film, this.list.childNodes[id+1])
            const temp = this.films[id]
            this.films[id] = this.films[id+1]
            this.films[id+1] = temp
            localStorage.setItem("list", this.list.innerHTML)
            localStorage.setItem("films", JSON.stringify(this.films))
        }
    },
}

app.init({formSelector: '#film-form', listSelector: '#film-list'})

//localStorage.clear() //NUKE IF NECESSARY