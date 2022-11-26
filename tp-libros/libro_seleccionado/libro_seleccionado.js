const d=document;
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
    if(localStorage.getItem("book") === "undefined" || localStorage.getItem("book") === null){
        window.location.href = '../login/login.html';
    }else{
        id = JSON.parse(localStorage.getItem("book"));
    }

    return id;
}

const getAll=async () => {
  
    const urlLibros = "http://localhost:3000/book/"+getIdBook();
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
        
        let isbn=document.querySelector(".isbn");
        isbn.append(json.boo_ISBN);

        let autor=document.querySelector(".autor");
        autor.append(json.boo_ISBN);


        let titulo=document.querySelector(".titulo");
        titulo.append(json.boo_ISBN);


        let genero=document.querySelector(".genero");
        genero.append(json.boo_ISBN);


        let owner=document.querySelector(".owner");
        owner.append(json.boo_ISBN);
        
            /*$template.querySelector(".isbn").textContent=el.boo_ISBN;
            $template.querySelector(".autor").textContent=el.autId.aut_name+" "+el.autId.aut_surname;
            $template.querySelector(".titulo").textContent=el.boo_title;
            $template.querySelector(".genero").textContent=el.genId.gen_name;
            $template.querySelector(".owner").textContent=el.ass_id.ass_username;
            $template.querySelector(".fecha-book").textContent=;*/

            
            let $clone=d.importNode($template,true);
            $fragment.appendChild($clone);
    

        $table.querySelector("body").appendChild($fragment);
        
    } catch(err){
        let message=err.statusText || "ERROR";
        //$table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}</b></p>`);

    }
   
}

d.addEventListener("DOMContentLoaded",getAll);
