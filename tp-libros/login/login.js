function login() {

    const url = "http://localhost:3000/associated";
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
    VALUE = JSON.stringify(data, null,2);
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
            
            if(data.body === 'Not Found' ){

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
    localStorage.setItem("TokenUser", JSON.stringify(token));
}

// const response = async () => {
//     const response = await fetch("http://127.0.0.1:3000/book-club-api/src/associated")
//     const data = await response.json()

// }

