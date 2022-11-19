function login() {

    let form = document.forms["form"];
    let fd = new FormData(form);
    let data = {};
    for (let [key, prop] of fd) {
        data[key] = prop;
    }
    VALUE = JSON.stringify(data, null, 2);
    console.log(VALUE);
    const url = "http://127.0.0.1:3000/book-club-api/src/associated";
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    fetch()(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: VALUE,
    })
        .then(data => data.json())
        .then(data => { console.log(data) })
        .catch((err) => {
            console.error(err);
        })

}

const response = async () =>{
    const response = await fetch("http://127.0.0.1:3000/book-club-api/src/associated")
    const data = await response.json()

}