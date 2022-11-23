window.onload = function () {

    let token = getLocalStorage;
    const url = "http://localhost:3000/associated";


    const send = {
        method: 'POST',
        body: token,
        headers: {
            'Content-Type': 'application/json',
            
        }
    };

    fetch(url, send)
        .then(res => checkStatus(res))
        .catch((err) => {
            console.error(err);
        })
}

function checkStatus(e){
    if (e.statusCode === 400) {
        window.location.href = '../login/login.html';
    }
}

function getLocalStorage() {
    let token = JSON.parse(localStorage.getItem("TokenUser"));
    return token;
}