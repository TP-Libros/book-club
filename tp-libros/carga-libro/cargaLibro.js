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
    let token = JSON.parse(localStorage.getItem("TokenUser"));
    data["ass_token"] = token;
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