let formData
var imgData
var elem = document.getElementById("drop-spot");

function handleFileDrop($eve) {
    $eve.preventDefault();
    image = document.getElementById("image-sink");
    var fr = new FileReader();
    fr.onload = loaded;
    function loaded(evt) {
        image.setAttribute("src", evt.target.result);
        const files = evt.target.files
        formData = new FormData()
    }
    fr.readAsDataURL($eve.dataTransfer.files[0]);
    imgData = $eve.dataTransfer.files[0]

}
function handleDragOver($eve) {
    console.log("file-over");
    $eve.preventDefault();
}

async function load() {

    const url = "http://127.0.0.1:3000/book";

    let form = document.forms["form"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    data["boo_imagePath"] = formData;
    let ass_id = JSON.parse(localStorage.getItem("User"));
    data["ass_token"] = ass_id;
    VALUE = JSON.stringify(data, null, 11);
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    console.log(VALUE)
    const send = {
        method: 'POST',
        body: VALUE,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getLocalStorage()
        }
    };

    await fetch(url, send)
        .then(response => checkStatus(response))
        .then(data => data.json())
        .then(data => {
            console.log(data)
        })
        .catch((err) => {
            console.error(err);
        })

}

window.onload = async function () {
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

    await fetch(urlAuthor, send)
        .then(response => checkStatus(response))
        .then(data => cargarAutores(data))
        .catch(error => console.log(error))



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

    await fetch(urlGender, send)
        .then(response => checkStatus(response))
        .then(data => cargarGender(data))
        .catch(error => console.log(error))

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

    await fetch(urlEditorial, send)
        .then(response => checkStatus(response))
        .then(data => cargarEditorial(data))
        .catch(error => console.log(error))
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
    if (e.statusCode === 401) {
        window.location.href = '../login/login.html';
    }
}