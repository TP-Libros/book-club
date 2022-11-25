
function getLocalStorage(){
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


function getIdBook() {

    let id;
    if(localStorage.getItem("idBook") === "undefined" || localStorage.getItem("idBook") === null){
        window.location.href = '../login/login.html';
    }else{
        id = JSON.parse(localStorage.getItem("User"));
    }
    return id;
}

const getAll=async () => {
    alert(getIdBook());
    const urlLibros = "http://localhost:3000/borrowing/ass/"+getIdBook();
    const send = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getLocalStorage()
        }
    };
    try{
        let res= await fetch(urlLibros,send),
        json=await res.json();
        if(!res.ok) throw {status: res.status,
        statusText: res.statusText};
        json.forEach(el => {
            $template.querySelector(".isbn").textContent=el.boo_id.boo_imagePath;
            $template.querySelector(".autor").textContent=el.boo_id.boo_title;
            $template.querySelector(".titulo").textContent=el.boo_id.boo_ISBN;
            $template.querySelector(".genero").textContent=el.boo_id.aut_id.aut_name+" "+el.boo_id.aut_id.aut_surname;
            $template.querySelector(".owner").textContent=el.boo_id.gen_id.gen_name;
            $template.querySelector(".fecha-book").textContent=el.bor_from_date;
            
            
            let $clone=d.importNode($template,true);
            $fragment.appendChild($clone);
        });

        $table.querySelector("tbody").appendChild($fragment);
        
    } catch(err){
        let message=err.statusText || "ERROR";
        $table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}</b></p>`);

    }
   
}

d.addEventListener("DOMContentLoaded",getAll);
