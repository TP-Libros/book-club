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
        let books = json[0].book;
        if(!res.ok) throw {status: res.status,
        statusText: res.statusText};

        let img=document.querySelector(".image").src=books.boo_imagePath;
    

        let isbn=document.querySelector(".isbn");
        isbn.append(books.boo_ISBN);

        let autor=document.querySelector(".autor");
        autor.append(books.aut_id.aut_name+" "+books.aut_id.aut_surname);


        let titulo=document.querySelector(".titulo");
        titulo.append(books.boo_title);


        let genero=document.querySelector(".genero");
        genero.append(books.gen_id.gen_name);


        let owner=document.querySelector(".owner");
        owner.append(books.ass_id.ass_userName);

        let buttonSolicitar=document.querySelector(".solicitar");
        let buttonDevolver=document.querySelector(".devolver");
    

        if(books.boo_borrowingSt){
            buttonSolicitar.disabled=true;
        }else{
            buttonDevolver.disabled=true;
        }        
        
    } catch(err){
        let message=err.statusText || "ERROR";
       
       
    }
   
}

const returnButton = d.querySelector('.devolver');
async function returnBook() {

    const urlLibros = "http://localhost:3000/borrowing/returnBorrowing/"+JSON.parse(localStorage.getItem("borrowing"));
    const send = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getLocalStorage()
        }
    }
try{
        let res= await fetch(urlLibros,send);
        json=await res.json();
        if(!res.ok) throw {status: res.status,
        statusText: res.statusText};
        alert('Libro devuelto');
        window.location.href = '/tp-libros/libros_aprestamo/libros_aprestamo.html';
            
    } catch(err){
        let message=err.statusText || "ERROR";
    
    }
}

returnButton.addEventListener('click', returnBook);


const solicitarButton = d.querySelector('.solicitar');
async function solicitarBook() {

    document.getElementsByClassName("solicitar").disabled = true

    document.getElementsByClassName("devolver").disabled = true


    const date = new Date();
    let data = {};
    let semanaEnMilisegundos = 1000 * 60 * 60 * 24 * 14; //dos semanas
    let suma = date.getTime() + semanaEnMilisegundos;
    let fechaDentroDeDosSemana = new Date(suma);
    const urlLibros = "http://localhost:3000/borrowing";

    data["booId"] = getIdBook();
    data["bor_from_date"] = date;
    data["bor_to_date"] = fechaDentroDeDosSemana;
    data["bor_devolution_date"] = null;
    data["assId"] = getidAss().ass_id;
    VALUE = JSON.stringify(data, null, 11);
    
    const send = {
        method: 'POST',
        body: VALUE,
        headers: {
            'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getLocalStorage()
        },
    }
    try{
        let res= await fetch(urlLibros,send);
        json=await res.json();
        if(!res.ok) throw {status: res.status,
        statusText: res.statusText};
        alert('Solicitado')
        window.location.href = '/tp-libros/libros_aprestamo/libros_aprestamo.html';
            
    } catch(err){
        alert("Alcanzaste la cantidad maxima de libros solicitados")
        let message=err.statusText || "ERROR";
    }
}

solicitarButton.addEventListener('click', solicitarBook);

function getidAss(){
    let id;
    id = JSON.parse(localStorage.getItem("User"));
return id;
}

d.addEventListener("DOMContentLoaded",getAll);

