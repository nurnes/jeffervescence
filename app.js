const app = {
    init(formSelector){
        this.max = 0
        document.querySelector(formSelector).addEventListener('submit', this.addFilm.bind(this))
    },
    addFilm(ev){
        ev.preventDefault()
        const f = ev.target
        const film = {
            name: f.filmName.value,
            id: this.max+1
        }
        this.max++
        console.log(film.name, film.id)
    },
}

app.init('form#filmForm')