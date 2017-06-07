const app = {
    init(formSelector){
        document.querySelector(formSelector).addEventListener('submit', this.addFilm)
    },
    addFilm(ev){
        ev.preventDefault()
        const name = ev.target.filmName.value
        console.log(name)
    },
}

app.init('form#filmForm')