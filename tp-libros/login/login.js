document.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const url = "http://localhost:3000/auth/login";
    let form = document.forms["form"];
    let fd = new FormData(form);
    let datas = {};
    for (let [key, prop] of fd) {
        datas[key] = prop;
    }
    VALUE = JSON.stringify(datas, null, 2);
    console.log(VALUE)

    const send = {
        method: 'POST',
        body: VALUE,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    try{
        let response
        response = await fetch(url,send)
        let data = await response.json()
        if (data.message === 'username or password incorrect') {
            document.getElementById("errorMsg").innerHTML ="User or password incorrect"
        } else {
            saveLocalStorage(data)
            window.location.href = "../libros_aprestamo/libros_aprestamo.html";
        }
    } catch (e) {
        return e.message;
    }


}
)

// function login(event) {


//     const url = "http://localhost:3000/auth/login";
//     let form = document.forms["form"];
//     let fd = new FormData(form);
//     let datas = {};
//     for (let [key, prop] of fd) {
//         datas[key] = prop;
//     }
//     VALUE = JSON.stringify(datas, null, 2);
//     console.log(VALUE)

//     const send = {
//         method: 'POST',
//         body: VALUE,
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     };

//     // let res =  fetch(url, send), 
//     // json =  res.json();
//     // console.log(json)

//     fetch(url, send)
//         .then(response => response.json())
//         .then(data => {

//             if (data.body === 'username or password incorrect') {
//                 document.getElementById("errorMsg").appendChild("User or password incorrect")
//                 window.location.href = "login.html";
//             } else {
//                 saveLocalStorage(data)
//                 window.location.href = "../libro_propio/libros_propios.html";
//             }
//         })
//         .catch((err) => {
//             console.error(err);
//         })

// }
function saveLocalStorage(data) {
    let token = data.token;
    let user = data.associated;

    localStorage.setItem("TokenUser", JSON.stringify(token));
    localStorage.setItem("User", JSON.stringify(user));

}

// const response = async () => {
//     const response = await fetch("http://127.0.0.1:3000/book-club-api/src/associated")
//     const data = await response.json()

// }

