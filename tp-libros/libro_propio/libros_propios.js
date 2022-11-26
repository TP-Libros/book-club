const check = document.getElementById("cbox1") 
window.onload = () => { 
    cargeBook()
}

loadBooksBorrowed = (data) => {

    let books = data[0].book;
    let borrowing = data[0].borrowing

    var book = []
    var j = 0;

    for (let i = 0; i < books.length; i++) {
        const element = books[i];
        if (element.boo_borrowingSt === true){
            book[j] = element
            j++
        }
        
    }

    let send = {}
    send[0] = {book, borrowing};

    loadBooks(send)

}

check.addEventListener("change", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    var a = document.getElementById("book-list");

    while (a.hasChildNodes())
        a.removeChild(a.firstChild);

    user = JSON.parse(localStorage.getItem("User"));

    const url = "http://localhost:3000/book/myBooks/" + user.ass_id

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

        if (check.checked) {
            loadBooksBorrowed(data)
        }else{
            loadBooks(data)
        }
    } catch (e) {
        return e.message;
    }


})

loadBooks = (data) => {

    let books = data[0].book
    let borrowing = data[0].borrowing

    for (let i = 0; i < books.length; i++) {
        const element = books[i];
        let borrow = borrowing.find(el => el.booId === element.boo_id);

        let tittle = document.createElement("div")
        tittle.classList.add("book-tittle")

        tittleText = document.createElement("p")
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

        let borrowState = document.createElement("div")
        borrowState.classList.add("borrowState")
        let borrowStateText = document.createElement("p")
        if (element.boo_borrowingSt) {
            borrowStateText = "Prestado"
        } else {
            borrowStateText = "Para prestar"
        }
        borrowState.append(borrowStateText)

        let newBook = document.createElement("div");
        newBook.classList.add("book");
        newBook.setAttribute("id", element.boo_id)
        newBook.append(image)
        newBook.append(text)
        newBook.append(isbn)
        newBook.append(gender)
        newBook.append(borrowState)

        if (borrow !== undefined) {
            let borrowed_to = document.createElement("div")
            borrowed_to.classList.add("borrowed_to")
            let borrowed_to_text = document.createElement("p")
            borrowed_to_text = borrow.ass_id.ass_userName
            borrowed_to.append(borrowed_to_text)

            let date_to = document.createElement("div")
            date_to.classList.add("date_to")
            let date_to_text = document.createElement("p")
            date_to_text = borrow.bor_to_date
            var date = date_to_text.slice(0, -14)
            date_to.append(date)

            let borrowed = document.createElement("div")
            borrowed.classList.add("borrowed")
            borrowed.append(borrowed_to)
            borrowed.append(date_to)

            newBook.append(borrowed)
        }

        if (!element.boo_borrowingSt) {
            let buttonModification = document.createElement("button")
            buttonModification.classList.add("button")
            buttonModification.textContent = "Modificar"

            let buttonDelete = document.createElement("button")
            buttonDelete.classList.add("button")
            buttonDelete.textContent = "Eliminar"

            buttonModification.setAttribute("onclick", "redirectSelectedModification(this.parentNode)")
            buttonDelete.setAttribute("onclick", "redirectSelectedDelete(this.parentNode)")

            newBook.append(buttonModification)
            newBook.append(buttonDelete)
        }




        document.getElementById("book-list").append(newBook)

    }
}

function redirectSelectedModification(e) {

    localStorage.setItem("book", JSON.stringify(e.id))
    window.location.href = "/tp-libros/modificacion/modificacion.html"
}

async function redirectSelectedDelete(e) {

    const urlLibros = "http://localhost:3000/book/" + e.id;
    const send = {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getLocalStorage()
        }
    }
    try {
        let res = await fetch(urlLibros, send);
        checkStatus(res)
        let data = await res.json();
    } catch (err) {
        let message = err.statusText
        console.log(message)
    }
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

async function cargeBook() {

    checkUser()

    user = JSON.parse(localStorage.getItem("User"));

    const url = "http://localhost:3000/book/myBooks/" + user.ass_id

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
        loadBooks(data);
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

///borrowing/returnBorrowing/{id}

// const checkbox = document.getElementById("cbox1");
// checkbox.addEventListener('click', cargeBook);
