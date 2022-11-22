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
            .then(data => data.json())
            .then(data => { 
                
                if(data.body === 'Not Found' ){
                    window.location.href='/login/login.html';
                }
             })
            .catch((err) => {
                console.error(err);
            })
}

function getLocalStorage() {
    let token = JSON.parse(localStorage.getItem("TokenUser"));
    return token;
}