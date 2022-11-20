function login() {

    const url = "http://127.0.0.1:3000/book-club-api/src/associated";
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
    VALUE = JSON.stringify(data, null, 2);
    console.log(VALUE);
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
        .then(data => { 
            if(data.body === '' ){

            }else{
                saveLocalStorage()
            }
         })
        .catch((err) => {
            console.error(err);
        })

}
function saveLocalStorage() {

    let token = {
        
    }

    partida.name1 = game.player1.value;
    partida.name2 = game.player2.value;
    partida.score1 = s1;
    partida.score2 = s2;

    localStorage.setItem("game" + gameNumber, JSON.stringify(partida));
}

// const response = async () => {
//     const response = await fetch("http://127.0.0.1:3000/book-club-api/src/associated")
//     const data = await response.json()

// }

