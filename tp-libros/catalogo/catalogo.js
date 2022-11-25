// const d = document;
// d.addEventListener("DOMContentLoaded", cargeCatalogo())

window.onload = () => {cargeCatalogo()}

const loadBooks = (data) => {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        let tittle = document.createElement("div")
        tittle.classList.add("book-tittle")
        tittle = element.boo_title

        let author = document.createElement("div")
        author.classList.add("book-author")
        author = element.aut_id.aut_id

        let text = document.createElement("div")
        text.classList.add("book-text")
        text.append(tittle)
        text.append(author)

        let image = document.createElement("div")
        image.classList.add("book-img")
        image = element.boo_imagePath

        let isbn = document.createElement("div")
        isbn.classList.add("book-isbn")
        isbn = element.boo_ISBN

        let gender = document.createElement("div")
        gender.classList.add("book-gender")
        gender = element.genId

        let newBook = document.createElement("div");
        newBook.classList.add("book");
        newBook.setAttribute("id", element.boo_id)
        newBook.append(image)
        newBook.append(text)
        newBook.append(isbn)
        newBook.append(gender)

        document.getElementById("book-list").append(newBook)

    }
}

function checkUser(){
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
    }catch(e){
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