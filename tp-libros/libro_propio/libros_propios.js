

const d=document,
$table=d.querySelector(".b-list"),
$template=d.getElementById("template-book").content,
$fragment=d.createDocumentFragment();

let idLibro=0;


function getLOcalStorage(){
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

function getIdUser() {

    let id;
    if(localStorage.getItem("TokenUser") === "undefined" || localStorage.getItem("TokenUser") === null){
        window.location.href = '../login/login.html';
    }else{
        id = JSON.parse(localStorage.getItem("User"));
    }
    return id.ass_id;
}

const getAll=async () => {
    const urlLibros = "http://localhost:3000/book/myBooks/"+getIdUser();
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
        console.log(json);
        if(!res.ok) throw {status: res.status,
        statusText: res.statusText};
        json.forEach(el => {

            $template.querySelector(".image-book").textContent=el.boo_imagePath;
            $template.querySelector(".title-book").textContent=el.boo_title;
            $template.querySelector(".isbn-book").textContent=el.boo_ISBN;
            $template.querySelector(".autor-book").textContent=el.aut_id.aut_name+" "+el.aut_id.aut_surname;
            $template.querySelector(".gender-book").textContent=el.gen_id.gen_name;
            $template.querySelector(".prestado-book").textContent=el.boo_borrowingSt;
            $template.querySelector(".posecion-book").textContent=el.boo_borrowingSt;
        //  $template.querySelector(".fecha-book").textContent=el.bor_from_date;
        //  $template.querySelector(".boton-book").textContent="hola";
            idLibro=el.boo_id;
            guardarIdLibro(idLibro);


            
            let $clone=d.importNode($template,true);
            $fragment.appendChild($clone);
    
        });

        $table.querySelector("tbody").appendChild($fragment);
        
    } catch(err){
        let message=err.statusText || "ERROR";
        $table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}</b></p>`);
    }
}

function guardarIdLibro(id){
    localStorage.setItem("idBook", JSON.stringify(id));
}

d.addEventListener("DOMContentLoaded",getAll);
