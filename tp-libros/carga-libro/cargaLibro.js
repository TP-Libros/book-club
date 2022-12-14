var imageSrc = ""
var elem = document.getElementById("drop-spot");

function handleFileDrop($eve) {
    $eve.preventDefault();
    var image = document.getElementById("image-sink");
    var fr = new FileReader();
    fr.onload = loaded;
    function loaded(evt) {
        image.setAttribute("src", evt.target.result);
        imageSrc = image.src;
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

    const url = "http://127.0.0.1:3000/book";

    let form = document.forms["form"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    let ass_id = JSON.parse(localStorage.getItem("User"));
    data["assId"] = ass_id.ass_id;
    data["boo_imagePath"] = imageSrc;
    VALUE = JSON.stringify(data, null, 11);
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    if (validacion(data)) {

        console.log(VALUE)
        const send = {
            method: 'POST',
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
    window.location.href = '/tp-libros/libro_propio/libros_propios.html'
}

window.onload = async function () {

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
            document.getElementById("author").appendChild(option)
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
            document.getElementById("gender").appendChild(option)
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
            document.getElementById("editorial").appendChild(option)
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

function validacion(data){
    if ( validaVacio(data["boo_ISBN"]) || validaVacio(data["boo_title"]) || validaVacio(data["autId"]) || validaVacio(data["boo_yearEdition"]) || validaVacio(data["genId"]) || validaVacio(data["ediId"]) || data["boo_imagePath"] === "") {  //COMPRUEBA CAMPOS VACIOS
        alert("Los campos no pueden quedar vacios");
        return false;
    }
    return true;
}

function validaVacio(valor) {
    
    valor = valor.replace("&nbsp;", "");
    valor = valor == undefined ? "" : valor;
    if (!valor || 0 === valor.trim().length) {
        return true;
    }
    else {
        return false;
    }
}