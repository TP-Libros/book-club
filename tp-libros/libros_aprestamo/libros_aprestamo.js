

window.onload = () => { cargeBook() }

const loadBooks = (data) => {


    data.forEach(el => {


         let tittle = document.createElement("div")
        tittle.classList.add("book-tittle")

        tittleText = document.createElement("p")
        tittleText = el.boo_id.boo_title
        tittle.append(tittleText)

        let author = document.createElement("div")
        author.classList.add("book-author")
        authorText = document.createElement("p")
        authorText = el.boo_id.aut_id.aut_name + " " + el.boo_id.aut_id.aut_surname
        author.append(authorText)

       let image = document.createElement("div")
        image.classList.add("book-img")
        let imagesrc = document.createElement("img")
        imagesrc.classList.add("image-b");
        imagesrc.src = el.boo_id.boo_imagePath
        image.append(imagesrc)

        let isbn = document.createElement("div")
        isbn.classList.add("book-isbn")
        let isbnText = document.createElement("p")
        isbnText = el.boo_id.boo_ISBN;
        isbn.append(isbnText)

        let gender = document.createElement("div")
        gender.classList.add("book-gender")
        let genderText = document.createElement("p")
        genderText = el.boo_id.gen_id.gen_name
        gender.append(genderText)

        let fecha = document.createElement("div")
        gender.classList.add("book-gender")
        let fechaText = document.createElement("p")
        fechaText = el.bor_from_date
        fecha.append(fechaText)

        let newBook = document.createElement("div");
        newBook.classList.add("book");
        newBook.setAttribute("id", el.booId)
        newBook.setAttribute("borrowing", el.bor_id)

        let buttonVer = document.createElement("button")
            buttonVer.classList.add("button")
            buttonVer.textContent = "Ver"
            buttonVer.setAttribute("onclick", "redirectSelectedModification(this.parentNode)")



        newBook.append(image)
        newBook.append(tittle)
        newBook.append(author)
        newBook.append(isbn)
        newBook.append(gender)
        newBook.append(fecha)
        newBook.append(buttonVer)
        
        

        document.getElementById("book-list").append(newBook)

    });
   

}

function redirectSelectedModification(e){

    localStorage.setItem("book", JSON.stringify(e.id))
    localStorage.setItem("borrowing", JSON.stringify(e.getAttribute("borrowing")))
    window.location.href="../libro_seleccionado/libro_seleccionado.html"
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

        user = JSON.parse(localStorage.getItem("User"));
    document.getElementById("name").textContent = user.ass_userName
}

async function cargeBook() {

    checkUser()

    user = JSON.parse(localStorage.getItem("User"));

    const url = "http://localhost:3000/borrowing/ass/" + user.ass_id

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


