var imageSrc = ""
var elem = document.getElementById("drop-spot");

function handleFileDrop($eve) {
    $eve.preventDefault();
    var image = document.getElementById("image-sink");
    var fr = new FileReader();
    fr.onload = loaded;
    function loaded(evt) {
        image.setAttribute("src", evt.target.result);
    }
    fr.readAsDataURL($eve.dataTransfer.files[0]);

}
function handleDragOver($eve) {
    console.log("file-over");
    $eve.preventDefault();
}

