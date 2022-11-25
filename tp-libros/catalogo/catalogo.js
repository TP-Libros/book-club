const d=document,
$table=d.querySelector(".b-list"),
$template=d.getElementsByClassName("book").content,
$fragment=d.createDocumentFragment();

const ruta="http://localhost:3000/book";

const getAll=async () => {
    try{
        let res= await fetch(ruta),
        json=await res.json();
        console.log(json);
        if(!res.ok) throw {status: res.status,
        statusText: res.statusText};
        json.forEach(el => {

            let tittle = document.createElement("div")
            tittle.classList("book-tittle")
            let author = document.createElement("div")
            author.classList("book-author")

            let text = document.createElement("div")
            text.classList("book-text")
            text.appendChild(tittle)
            text.appendChild(author)

            let image = document.createElement("div")
            image.classList("book-img")

            let isbn = document.createElement("div")
            isbn.classList("book-isbn")

            let gender = document.createElement("div")
            gender.classList("book-gender")

            let newBook = document.createElement("div");
            newBook.classList.add("book");
            newBook.appendChild(image)
            newBook.appendChild(text)
            newBook.appendChild(isbn)
            newBook.appendChild(gender)
                      

            // $template.querySelector(".image-book").textContent=el.boo_imagePath;
            // $template.querySelector(".title-book").textContent=el.boo_title;
            // $template.querySelector(".isbn-book").textContent=el.boo_ISBN;
            // $template.querySelector(".autor-book").textContent=el.aut_id.aut_name+" "+el.aut_id.aut_surname;
            // $template.querySelector(".gender-book").textContent=el.gen_id.gen_name;
        
            // let $clone=d.importNode($template,true);
            // $fragment.appendChild($clone);
        });

        $table.querySelector("tbody").appendChild($fragment);
        
    } catch(err){
        let message=err.statusText || "ERROR";
        $table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}</b></p>`);

    }
   
}




d.addEventListener("DOMContentLoaded",getAll);