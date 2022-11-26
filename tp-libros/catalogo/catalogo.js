// const d = document;
// d.addEventListener("DOMContentLoaded", cargeCatalogo())

window.onload = () => { cargeCatalogo() }

const loadBooks = (data) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let tittle = document.createElement("div")
        tittle.classList.add("book-tittle")

        tittleText =document.createElement("p")
        tittleText = element.boo_title
        tittle.append(tittleText)

        let author = document.createElement("div")
        author.classList.add("book-author")
        authorText = document.createElement("p")
        authorText = element.aut_id.aut_name + " " + element.aut_id.aut_surname
        author.append(authorText)

        let text = document.createElement("div")
        text.classList.add("book-text")
        text.append(tittle)
        text.append(author)

        let image = document.createElement("div")
        image.classList.add("book-img")
        let imagesrc = document.createElement("img")
        imagesrc.classList.add("image-b"); 
        imagesrc.src = element.boo_imagePath
        image.append(imagesrc)

        let isbn = document.createElement("div")
        isbn.classList.add("book-isbn")
        let isbnText = document.createElement("p")
        isbnText = element.boo_ISBN;
        isbn.append(isbnText)

        let gender = document.createElement("div")
        gender.classList.add("book-gender")
        let genderText = document.createElement("p")
        genderText = element.gen_id.gen_name
        gender.append(genderText)

        let button = document.createElement("button")
        button.classList.add("button")
        button.textContent = "Pedir"

        button.setAttribute("onclick", "redirectSelected(this.parentNode)")

        let newBook = document.createElement("div");
        newBook.classList.add("book");
        newBook.setAttribute("id", element.boo_id)
        newBook.append(image)
        newBook.append(text)
        newBook.append(isbn)
        newBook.append(gender)
        newBook.append(button)

        document.getElementById("book-list").append(newBook)

    }
}

function redirectSelected(e){

    localStorage.setItem("book", JSON.stringify(e.id))
    window.location.href="/tp-libros/libro_seleccionado/libro_seleccionado.html"
}

function checkUser() {
    let token = getLocalStorage();
    const url = "http://localhost:3000/associated";


    const send = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    };

    fetch(url, send)
        .then(res => checkStatus(res))
        .catch((err) => {
            console.error(err);
        })
}

async function cargeCatalogo() {

    checkUser()

    const url = "http://localhost:3000/book"

    const send = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getLocalStorage()
        }
    }

    try {
        let response;
        response = await fetch(url, send)
        checkStatus(response)
        let data = await response.json();
        loadBooks(data)
    } catch (e) {
        return e.message;
    }


}

document.addEventListener('change', (event) => {
    event.preventDefault()
    event.stopPropagation()

    const urlISBNFilter = "http://localhost:3000/book/filter/isbn/"
    const urlAuthorFilter = "http://localhost:3000/book/filter/author/"
    const urlGenderFilter = "http://localhost:3000/book/filter/gender/"
    const urltittleFilter = "http://localhost:3000/book/filter/title/"

    let form = document.forms["form"]
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }

    if (data["gender-search"] !== "") {
        sendRequest(urlGenderFilter + data["gender-search"])
    }

    if (data["tittle-search"] !== "") {
        sendRequest(urltittleFilter + data["tittle-search"])
    }

    if (data["author-search"] !== "") {
        sendRequest(urlAuthorFilter + data["author-search"])
    }

    if (data["isbn-search"] !== "") {
        sendRequest(urlISBNFilter + data["isbn-search"])
    }

    if((data["isbn-search"] === "") && (data["author-search"] === "") && (data["tittle-search"] === "") && (data["gender-search"] === "")){
        cargeCatalogo()
    }
})

async function sendRequest(url) {

    var a = document.getElementById("book-list");

    while (a.hasChildNodes())
        a.removeChild(a.firstChild);

        const send = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getLocalStorage()
            }
        }
    
        try {
            let response;
            response = await fetch(url, send)
            checkStatus(response)
            let data = await response.json();
            loadBooks(data)
        } catch (e) {
            return e.message;
        }

}


function getLocalStorage() {
    let token;
    if (localStorage.getItem("TokenUser") === "undefined" || localStorage.getItem("TokenUser") === null) {
        window.location.href = '../login/login.html';
    } else {
        token = JSON.parse(localStorage.getItem("TokenUser"));
    }
    return token;
}

function checkStatus(e) {
    if (e.status === 401) {
        window.location.href = '../login/login.html';
    }
}