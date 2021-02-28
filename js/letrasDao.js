$(document).ready(function() {
  localStorage.setItem("ordem",0);
});

function lista(){
  //service
  localStorage.getItem("minhaLista") ? getAllStorage():"";
}

function getCurrentAlbums(div){
/*   let c = $(this).attr('name');
  let alb = getJsonById('minhaLista')[c].albums;        

  alb.forEach(element => {
    let sub = document.createElement('div');        
    sub.innerHTML = element.desc;
    div.append(sub);
  });

  return div; */
}


function saveMus(){
  //view
  let letra = $("#letra").text();

  //service
  let lista = new Object();
  //ordem criada já no inicio;
  ordem = parseInt(localStorage.getItem('ordem')); 
  let id = 0;
  
  //service  
  let c = chaveBuild(artista() + musica());  

  if(localStorage.getItem("minhaLista")){    
    lista = getJsonById('minhaLista');    
    let id = (Object.keys(lista).length);
  }
  
  let fontSize = parseInt($("#letra").css("font-size"));
  let info = "";

  let img = getTemp().img;

  let albums = getAlbums();

  //service
  lista[c] = {
      'artista': artista(), 
      'musica': musica() , 
      'id': id + 1 , 
      'letra' : letra, 
      'fonte':fontSize , 
      'info':info,
      'albums':albums,
      'imagem':img      
    };
  
  localStorage.setItem("chaveTemp", c);
  localStorage.setItem("minhaLista", JSON.stringify(lista));
  localStorage.setItem("ordem", ordem);

  //remove da 'lastSearch'
  if(sessionStorage.getItem('tempLyric' + c)){
    sessionStorage.removeItem('tempLyric' + c);
  }

  //view
  $('#listStorage').append(lista);
}


function getAllStorage() {
  //service
  let playList = JSON.parse(localStorage.getItem("minhaLista"));  
  //view
  $('#listStorage').text("");
  $.each(playList, function(i, lista) {
    //view
    $('#listStorage').append(fragListStorage(lista));
  });
  
 
 playlistActions();  
}

function saveTemp(data){
  //saveAlbums(data.artist.albums.item); 
  sessionStorage.setItem('temp',JSON.stringify(data));
}

function getJsonById(id){
  //service
  //retorna um Json
  return JSON.parse(localStorage.getItem(id));
}

function isFavorite(chave){
  let map = getJsonById('minhaLista');
  bl = (map!=null && map[chave] != undefined) ? true:false;
  return bl;
}

function autoComplete(div,data){
    //autocomplete
    $(div).autocomplete({
     source: data
    });
/* 
    $('#listArt').empty();
    let lista = "";

      data.forEach(element => {
         lista = "<div>" + element + "</div>";
      });

    $('#listArt').append(lista); */
}

function getTemp(){
  return JSON.parse(sessionStorage.getItem('temp'))
}

 function getAlbums(){      
  return JSON.parse(sessionStorage.getItem('temp')).albums;
 }

 function getMusLocal(chave){
  //service
    //let lista = getJsonById('minhaLista');   
    let lista = JSON.parse(sessionStorage.getItem('temp'));    
    return lista? lista[chave] ? lista[chave]:false:false;   
      //se lista?           ternario         /false
 }

 function getStatus(div){  
    return status = ($(div).attr("status") == 'true');    
 }

 function saveNotes(){
  let infoField = $("#anotacoes").val();  
  let lista = getJsonById('minhaLista');  
  let chave = localStorage.getItem('chaveTemp');    
  lista[chave].info = infoField;  
  localStorage.setItem('minhaLista',JSON.stringify(lista));
 }


 function delMus(id){
  let chave = id;
  //cria caso nao exista
  if(localStorage.getItem("minhaLista")) {
    //obtem lista
    let minhaLista = getJsonById('minhaLista');
    //operacao
    delete minhaLista[chave];

    //service
    localStorage.setItem("minhaLista",JSON.stringify(minhaLista));
    //view
    $("#" + id).fadeOut();
  }
 }






