var imageSrc = ""
var elem = document.getElementById("drop-spot");

window.onload = () => { setValues() }

async function setValues(){

    checkUser()

    const urlAuthor = "http://127.0.0.1:3000/author";

    const send = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getLocalStorage()
        }
    };


    const cargarAutores = (data) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            option = document.createElement("option");
            option.text = element.aut_name + " " + element.aut_surname;
            option.value = element.aut_id;
            option.setAttribute("id", element.aut_id);
            document.getElementById("autId").appendChild(option)
        }

    }

    try {
        let response;
        response = await fetch(urlAuthor, send)
        checkStatus(response)
        let data = await response.json();
        cargarAutores(data)
    } catch (e) {
        return e.message;
    }

    const urlGender = "http://127.0.0.1:3000/gender";

    const cargarGender = (data) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            option = document.createElement("option");
            option.text = element.gen_name;
            option.value = element.gen_id;
            option.setAttribute("id", element.gen_id);
            document.getElementById("genId").appendChild(option)
        }


    }

    try {
        let response;
        response = await fetch(urlGender, send)
        checkStatus(response)
        let data = await response.json();
        cargarGender(data)
    } catch (e) {
        return e.message;
    }

    const urlEditorial = "http://127.0.0.1:3000/editorial";

    const cargarEditorial = (data) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            option = document.createElement("option");
            option.text = element.edi_name;
            option.value = element.edi_id;
            option.setAttribute("id", element.edi_id)
            document.getElementById("ediId").appendChild(option)
        }


    }

    try {
        let response;
        response = await fetch(urlEditorial, send)
        checkStatus(response)
        let data = await response.json();
        cargarEditorial(data)
    } catch (e) {
        return e.message;
    }

    getBookForModification()
}

function handleFileDrop($eve) {
    $eve.preventDefault();
    var image = document.getElementById("image-sink");
    var fr = new FileReader();
    fr.onload = loaded;
    function loaded(evt) {
        image.setAttribute("src", evt.target.result);
        imageSrc = fr;
    }
    fr.readAsDataURL($eve.dataTransfer.files[0]);
}
function handleDragOver($eve) {
    console.log("file-over");
    $eve.preventDefault();
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

document.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();

    document.getElementById("btn").disabled = true

    let book = JSON.parse(localStorage.getItem("book"));

    const url = "http://127.0.0.1:3000/book/" + book;

    let form = document.forms["form"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    let ass_id = JSON.parse(localStorage.getItem("User"));
    data["assId"] = ass_id.ass_id;
    data["boo_borrowingSt"] = false
    data["boo_imagePath"] = imageSrc.result;
    VALUE = JSON.stringify(data, null, 10);
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    if (validacion(data)) {
        console.log(VALUE)
        const send = {
            method: 'PUT',
            body: VALUE,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getLocalStorage()
            }
        };

        try {
            let respo;
            respo = await fetch(url, send)
            checkStatus(respo)
            let data = await respo.json()
            redirect()
        } catch (e) {
            return e.message
        }
    }

}) 

function redirect() {
    window.location.href = '../libro_propio/libros_propios.html';
}

async function getBookForModification() {

    let bookId = JSON.parse(localStorage.getItem("book"))

    const url = "http://127.0.0.1:3000/book/" + bookId;

    const send = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getLocalStorage()
        }
    };

    let book = {}

    try {
        let response;
        response = await fetch(url, send)
        checkStatus(response)
        let data = await response.json();
        book = data[0].book
    } catch (e) {
        return e.message;
    }

    document.getElementById("boo_isbn").value = book.boo_ISBN;
    document.getElementById("boo_title").value = book.boo_title;
    document.getElementById("autId").value = book.aut_id.aut_id
    document.getElementById("genId").value = book.gen_id.gen_id
    document.getElementById("boo_yearEdition").value = book.boo_yearEdition;
    document.getElementById("boo_synopsis").value = book.boo_synopsis;
    document.getElementById("ediId").value = book.edi_id.edi_id
    document.getElementById("image-sink").src = book.boo_imagePath;
    imageSrc = book.boo_imagePath;
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

function validacion(data) {


    if (validaVacio(data["boo_ISBN"]) || validaVacio(data["boo_title"]) || validaVacio(data["autId"]) || validaVacio(data["boo_yearEdition"]) || validaVacio(data["genId"]) || validaVacio(data["ediId"]) || data["boo_imagePath"] === "") {  //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }
    return true;
}

function validaVacio(valor) {
    valor = valor == undefined ? "" : valor;
    if (!valor || 0 === valor.trim().length) {
        return true;
    }
    else {
        return false;
    }
}

// for(var i=1;i<select.length;i++)

// {

//     if(select.options[i].text==buscar)

//     {

//         // seleccionamos el valor que coincide

//         select.selectedIndex=i;

//     }

// }