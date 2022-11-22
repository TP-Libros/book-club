function login() {

    const url = "";
    let form = document.forms["form"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    VALUE = JSON.stringify(data, null,2);
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
            
            if(data.body === 'Not Found' ){
                document.getElementById("errorMsg").appendChild(<p>User or password incorrect</p>)
                window.location.href='/login/login.html';
            }else{
                saveLocalStorage(data.body)
            }
         })
        .catch((err) => {
            console.error(err);
        })

}
function saveLocalStorage(data) {
    let token = data.token;
    let user = data.id;
    let name = data.name;

    localStorage.setItem("TokenUser", JSON.stringify(token));
    localStorage.setItem("idUser", JSON.stringify(user));
    localStorage.setItem("idUser", JSON.stringify(name));

}

// const response = async () => {
//     const response = await fetch("http://127.0.0.1:3000/book-club-api/src/associated")
//     const data = await response.json()

// }

