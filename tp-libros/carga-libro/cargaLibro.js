var imageSrc = ""
var elem = document.getElementById("drop-spot");

function handleFileDrop($eve) {
    $eve.preventDefault();
    var image = document.getElementById("image-sink");
    var fr = new FileReader();
    fr.onload = loaded;
    function loaded(evt) {
        image.setAttribute("src", evt.target.result);
    }
    fr.readAsDataURL($eve.dataTransfer.files[0]);

}
function handleDragOver($eve) {
    console.log("file-over");
    $eve.preventDefault();
}

function login() {

    const url = "http://127.0.0.1:3000/book";
    // fetch(url)
    //     .then(data => {
    //         return data.json();
    //     })
    //     .then(post => {
    //         console.log(post.title);
    //     });

    let form = document.forms["form"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    VALUE = JSON.stringify(data);
    // const myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');

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