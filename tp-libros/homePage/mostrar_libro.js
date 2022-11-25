const d=document,
$table=d.querySelector(".b-list"),
$template=d.getElementById("template-book").content,
$fragment=d.createDocumentFragment();

const ruta="http://localhost:3000/book/catalogueNoAssociated";

const getAll=async () => {
    try{
        let res= await fetch(ruta),
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