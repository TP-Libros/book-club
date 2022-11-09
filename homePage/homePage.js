
var player1Turn= true;

var playerTurnTxt;

var arrayBtns= new Array();// arreglo de celdas/btns

var arrayMarks= new Array();// arreglo de marcas

var arrayRecords= new Array();// arreglo para recuperar LocalStorage

var mark= null;

var amountPlays=0;

var nameError ="";

var timer;

var seconds;

var minutes='00';

var inputPlayer1= document.getElementById('player1Name');
var inputPlayer2= document.getElementById('player2Name');

var record;

var secs = document.getElementById('seconds');
var mins = document.getElementById('minutes');


function activateInPutName(){

    document.getElementById('player1Name').disabled = false;
    document.getElementById('player2Name').disabled = false;

    document.getElementById('namePlayer1').innerHTML= "[ Ingrese Nombre Jugador X ]";
    document.getElementById('namePlayer2').innerHTML= "[ Ingrese Nombre Jugador O ]";
}

function activateStartBtn(){
    document.getElementById('startBtn').disabled = false;
}

function activateSurranderBtn(){   
    document.getElementById('surrenderBtn').disabled = false;
}

function disableStartBtn(){
    document.getElementById('startBtn').disabled = true;
}

function disableSurranderBtn(){   
    document.getElementById('surrenderBtn').disabled = true;
}

function disableArrayBtns(){

    for (var i=0; i<9; i++){        
        arrayBtns[i].disabled = true;
    }

}

function disableInPutName(){

    document.getElementById('player1Name').disabled = true;
    document.getElementById('player2Name').disabled = true;

    document.getElementById('namePlayer1').innerHTML= "";
    document.getElementById('namePlayer2').innerHTML= "";
}

function initializePlayersName(){

    document.getElementById('namePlayer1').innerHTML= "[ Ingrese Nombre Jugador X ]";
    document.getElementById('namePlayer2').innerHTML= "[ Ingrese Nombre Jugador O ]";

    document.getElementById('player1Name').value= "";
    document.getElementById('player2Name').value= "";
}

function initializeArrays(){
        
    for (var i=0; i< 9; i++){

        arrayMarks[i] = null;
        arrayBtns[i] = document.getElementById(i);          
        arrayBtns[i].disabled = false;
        arrayBtns[i].innerHTML = "-";
        arrayBtns[i].style.backgroundColor = 'mediumvioletred';       
    }
}

function initializeGame(){
    
    amountPlays = 0; 

    disableStartBtn();
    activateSurranderBtn();
    initializeArrays();
    disableInPutName();
  
    document.getElementById('msg').value= "";
    player1Turn= true;  
    playerTurn='[[  Turno jugador:  '+inputPlayer1.value+' ]]';
    document.getElementById('msg').innerHTML= playerTurn;
        
    startTimer();
}

function start(){
            
    if(nameIsValid()){

       initializeGame();
       getRecordsLocalStorage();        
       insertRecordsTable();

            } else {

        alert(nameError);
    }           
}

function nameIsValid(){


    if( inputPlayer1.value!="" && inputPlayer2.value!=""){

      disableInPutName();

    return true;
   
    }else{

        if( inputPlayer1.value=="" ){
            nameError='El jugador "X" debe ingresar el nombre para comenzar el juego!';
       
        }else{
             nameError='El jugador "O" debe ingresar el nombre, para comenzar el juego!';
        }
    return false;
    } 
} 

function startTimer(){

    seconds = 15;
 
    timer= setInterval(
        
        function(){

            if(seconds<10){

                secs.innerHTML ='0'+seconds;
            }else{

                secs.innerHTML = seconds;
            }

            if(seconds==0){
                validWinner();
                endGame();
            }

            seconds--;            
        }
        ,1000);
}

function resertTimer(){
    seconds = 15;    
    secs.innerHTML = seconds;   
    mins.innerHTML = 'TiMeR '+minutes+':';
}  

function stopTimer(){
    clearInterval(timer);
}

function inputPlay(pos, player1Turn){
              
        document.getElementById('msg').innerHTML= playerTurn;
       
        arrayBtns[pos].innerHTML= mark;
        arrayBtns[pos].style.backgroundColor = player1Turn ? 'salmon' : 'lightsteelblue';
        arrayBtns[pos].disabled = true;

        arrayMarks[pos] = mark;          
}

function turnPlayed(pos){
                 
    if(player1Turn){
        mark = 'X';
               
    }else{
        mark = 'O';
    }
    
    player1Turn= !player1Turn;
        
        if( mark =='X'){            
            playerTurn='[[  Turno jugador:  '+inputPlayer2.value+' ]]'
        
        }else{          
            playerTurn='[[  Turno jugador:  '+inputPlayer1.value+' ]]'
        }
        inputPlay(pos,player1Turn);  
}
   
function pressedBtn(pos){    
    turnPlayed(pos);    
    validGame();
}
       
function validRow(){

    if((arrayMarks[0] == arrayMarks[1] && arrayMarks[0] == arrayMarks[2] && arrayMarks[0])||(arrayMarks[3] == arrayMarks[4] && arrayMarks[3] == arrayMarks[5] && arrayMarks[3])||(arrayMarks[6] == arrayMarks[7] && arrayMarks[6] == arrayMarks[8] && arrayMarks[6])){
        return true;
    }
    return false;
}

function validColumn(){

    if((arrayMarks[0] == arrayMarks[3] && arrayMarks[0] == arrayMarks[6] && arrayMarks[0])||(arrayMarks[1] == arrayMarks[4] && arrayMarks[1] == arrayMarks[7] && arrayMarks[1])||(arrayMarks[2] == arrayMarks[5] && arrayMarks[2] == arrayMarks[8] && arrayMarks[2])){
        return true;
    }
    return false;
}

function validDiagonal(){

    if((arrayMarks[0] == arrayMarks[4] && arrayMarks[0] == arrayMarks[8] && arrayMarks[0])||(arrayMarks[2] == arrayMarks[4] && arrayMarks[2] == arrayMarks[6] && arrayMarks[2])){
        return true;
    }
    return false;
}

function validTateti() {
    
    if (validRow()|| validColumn()||validDiagonal() ){
    return true;         
    
}else{    
    return false};
}

function validGame() { 

    amountPlays++;
    if(validTateti() || amountPlays==9 ){ 

        if( validTateti() ){       
         validWinner();
         endGame(); 
        }

        if(amountPlays==9 && !validTateti()){

        document.getElementById('msg').innerHTML= '<<  Han empatado: '+inputPlayer1.value+' y '+inputPlayer2.value+'  >>'; 
        record= 'Jugaron:'+inputPlayer1.value+'y'+inputPlayer2.value+'[[Empataron]]';
        insertRecordTable(record);        
        endGame(); 
        }
    
    }else{ 
       resertTimer();
    }
    
}

function validWinner(){     

    if(player1Turn){            
          
        document.getElementById('msg').innerHTML= '<< Ha GANADO: '+inputPlayer2.value+' >>';
        record = 'Jugaron: '+inputPlayer1.value+'y'+inputPlayer2.value+'.[[Ganó:'+inputPlayer2.value+']].';

     }else{       
        document.getElementById('msg').innerHTML= '<< Ha GANADO: '+inputPlayer1.value+' >>';
        record = 'Jugaron: '+inputPlayer1.value+'y'+inputPlayer2.value+'.[[Ganó:'+inputPlayer1.value+']].';
     }

   saveRecordsLocalStorage(record);
   insertRecordTable(record);
}

function surrenderBtn(){

    if(player1Turn){
    
        document.getElementById('msg').innerHTML= '<< Ha GANADO el jugador: '+inputPlayer2.value+' >>';        
        record = 'Jugaron: '+inputPlayer1.value+'y'+inputPlayer2.value+'.[[Ganó:'+inputPlayer2.value+']].';      
     
    }else{ 
        document.getElementById('msg').innerHTML= '<< Ha GANADO el jugador: '+inputPlayer1.value+' >>';
        record = 'Jugaron: '+inputPlayer1.value+'y'+inputPlayer2.value+'.[[Ganó:'+inputPlayer1.value+']].';         
    }

    saveRecordsLocalStorage(record);
    insertRecordTable(record);
    endGame();
}

function endGame(){
    stopTimer();
    activateStartBtn();
    activateInPutName();
    disableSurranderBtn();
    disableArrayBtns();
    startRefreshTimer();
 }

 function startRefreshTimer(){
    seconds = 3; 
    timer= setInterval(        
        function(){

            if(seconds ==0){
                location.reload();
            }
            seconds--;            
        }
        ,1000);
}

function saveRecordsLocalStorage(record){
    arrayRecords.push(record);
    localStorage.setItem('records', JSON.stringify(arrayRecords));        
}       

function  getRecordsLocalStorage(){
    
    tableRecords = document.getElementById('table');
    var newRow;
    var recordTxt;
    var recordsLocalStorage = localStorage.getItem('records');
    
    if(recordsLocalStorage!=null){
       arrayRecords = JSON.parse(recordsLocalStorage);
    }    
}    

function insertRecordsTable(){

    if(arrayRecords!=null){

        for(let i=0; i<arrayRecords.length; i++){                            
             newRow= tableRecords.insertRow(i); 
             recordTxt = document.createTextNode(arrayRecords[i]);     
             newRow.appendChild(recordTxt);
        }
    }
}

function insertRecordTable(record){

            var tableRecords = document.getElementById('table');        
            var newRow= tableRecords.insertRow();        
            var recordTxt= document.createTextNode(record);            
            newRow.appendChild(recordTxt);
}



