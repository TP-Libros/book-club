window.onload = async function () {

    let token = getLocalStorage();
    const url = "http://localhost:3000/associated";


    const send = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };

    await fetch(url, send)
        .then(res => checkStatus(res))
        .catch((err) => {
            console.error(err);
        })
}

function checkStatus(e){
    if (e.statusCode === 401) {
        window.location.href = '../login/login.html';
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