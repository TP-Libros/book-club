

const urlEditorial = "http://127.0.0.1:3000/borrowing/associated/";
await fetch(urlEditorial,send)
    .then(response => checkStatus(response))
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

function getLocalStorage() {

let token;
if(localStorage.getItem("TokenUser") === "undefined" || localStorage.getItem("TokenUser") === null){
    window.location.href = '../login/login.html';
}else{
    token = JSON.parse(localStorage.getItem("TokenUser"));
}
return token;
}

function checkStatus(e){
if (e.statusCode === 401) {
    window.location.href = '../login/login.html';
}
}

console.log(VALUE)
const send = {
method: 'POST',
body: VALUE,
headers: {
'Content-Type': 'application/json',
'Authorization': 'Bearer ' + getLocalStorage()

}
};