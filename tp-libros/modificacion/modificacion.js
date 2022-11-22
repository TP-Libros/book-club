document.addEventListener('DOMContentLoaded', function () {
    document.getElementsByClassName("modify-checkbox").onchange = modify(document.getElementsByClassName("modify-checkbox"));
}, false);

function modify(e) {
    var boxInput = e.parent().getElementsByClassName("box");
    boxInput.disabled = !boxInput.disabled;
}

var image
var imgData
var elem = document.getElementById("drop-spot");

function handleFileDrop($eve) {
    $eve.preventDefault();
    image = document.getElementById("image-sink");
    var fr = new FileReader();
    fr.onload = loaded;
    function loaded(evt) {
        image.setAttribute("src", evt.target.result);
    }
    fr.readAsDataURL($eve.dataTransfer.files[0]);
    imgData = $eve.dataTransfer.files[0]

}
function handleDragOver($eve) {
    console.log("file-over");
    $eve.preventDefault();
}

function load() {

    const url = "http://127.0.0.1:3000/book";

    let form = document.forms["form"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    data["boo_imagePath"] = imgData; 
    let ass_id = JSON.parse(localStorage.getItem("idUser"));
    data["ass_id"] = ass_id;
    VALUE = JSON.stringify(data, null, 11);
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

    console.log(VALUE)
    const send = {
    method: 'POST',
    body: VALUE,
    headers: {
    'Content-Type': 'application/json',
    }
    };

    fetch(url, send)
        .then(data => data.json())
        .then(data => { 
            console.log(data)
         })
        .catch((err) => {
            console.error(err);
        })

}

window.onload = function () {
    const urlAuthor = "http://127.0.0.1:3000/author";
    fetch(urlAuthor)
        .then(response => response.json())
        .then(data => cargarAutores(data))
        .catch(error => console.log(error))

    const cargarAutores = (data) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            option = document.createElement("option");
            option.text = element.aut_name +" " + element.aut_surname;
            option.value = element.aut_id;
            document.getElementById("author").appendChild(option)
        }
    

    }

    const urlGender = "http://127.0.0.1:3000/gender";
    fetch(urlGender)
        .then(response => response.json())
        .then(data => cargarGender(data))
        .catch(error => console.log(error))

    const cargarGender = (data) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            option = document.createElement("option");
            option.text = element.gen_name;
            option.value = element.gen_id;
            document.getElementById("gender").appendChild(option)
        }
    

    }

    const urlEditorial = "http://127.0.0.1:3000/editorial";
    fetch(urlEditorial)
        .then(response => response.json())
        .then(data => cargarEditorial(data))
        .catch(error => console.log(error))

    const cargarEditorial = (data) => {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            option = document.createElement("option");
            option.text = element.edi_name;
            option.value = element.edi_id;
            document.getElementById("editorial").appendChild(option)
        }
    

    }

}