const d=document,
$table=d.querySelector(".b-list"),
$template=d.getElementById("template-book").content,
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
            $template.querySelector(".image-book").textContent=el.boo_imagePath;
            $template.querySelector(".title-book").textContent=el.boo_title;
            $template.querySelector(".isbn-book").textContent=el.boo_ISBN;
            let idAutor=el.aut_id;
          
          // filtrar("author",idAutor,".autor-book",aut_name);
            let idGender=el.gen_id;
          //  filtrar("gender",idGender,".gender-book",aut_name);
        
            let $clone=d.importNode($template,true);
            $fragment.appendChild($clone);
        });

        $table.querySelector("tbody").appendChild($fragment);
        
    } catch(err){
        let message=err.statusText || "ERROR";
        $table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}</b></p>`);

    }
   
}

function filtrar(tabla,id,nombreClass,nombreCampo){
    let ruta=`http://localhost:3000/${tabla}/${id}`;
    const getAll=async () => {
        try{
            let res= await fetch(ruta),
            json=await res.json();
            console.log(json);
            if(!res.ok) throw {status: res.status,
            statusText: res.statusText};
            json.forEach(el => {    
                $template.querySelector(nombreClass).textContent=el.nombreCampo;
            
                let $clone=d.importNode($template,true);
                $fragment.appendChild($clone);
            });
    
            $table.querySelector("tbody").appendChild($fragment);
            
        } catch(err){
            let message=err.statusText || "ERROR";
            $table.insertAdjacentHTML("afterend",`<p><b>Error ${err.status}</b></p>`);
    
        }


    }
}

d.addEventListener("DOMContentLoaded",getAll);