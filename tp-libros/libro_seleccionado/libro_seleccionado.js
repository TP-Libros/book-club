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
        
        
    } catch(err){
        let message=err.statusText || "ERROR";
        //$table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}</b></p>`);
    }
   
}

const returnButton = d.querySelector('.devolver');
async function returnBook(borrowId) {
    const urlLibros = "http://localhost:3000/borrowing/returnBorrowing/"+borrowId;
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
        window.alert('Libro devuelto');
        window.location.href = '../libro_propio.libros_propios.html';
            
    } catch(err){
        let message=err.statusText || "ERROR";
        //$table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}</b></p>`);
    
    }
}
returnButton.addEventListener('onclick', returnB);
returnButton.addEventListener('onclick', returnBook);



d.addEventListener("DOMContentLoaded",getAll);

