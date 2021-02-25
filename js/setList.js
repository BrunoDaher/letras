function inicioSetList(){    
  getJsonById('minhaLista') ? navigateSet(1):"";
  swiper();
  //modal lista de músicas
  $("#btnFavorita").click(function(){
    favorita();
  });    

  
  $('#getNotes').click(()=>{alert(1)})

}



function favorita(){
    if(artista()=="" || artista()=="" || $("#letra").text() == "" ){    
    }
    else{
      saveMus();        
      goMusic(localStorage.getItem('chaveTemp'));
    }
}

//header
function zoom($value){
  var f =  $value + "px";    
    $("#letra").css({'font-size':f});       
    //tern  
    $("#letra").html() != "" ? saveMus():"";
}

//principal
function swiper() {  
  $("#principal").swiperight( ()=> 
  { 
    navigateSet(-1);
  });
  $("#principal").swipeleft( ()=> 
  {               
     navigateSet(1);
  });
}


function fragListStorage(lista){
  var chave = chaveBuilder(lista.artista,lista.musica);

  var div = sessionStorage.getItem('listModel');
  
  div = div.replaceAll("_idMusica",chave);
  div = div.replaceAll("_nomeMusica",lista.musica);
  div = div.replaceAll("_nomeBanda",lista.artista);

  return div;
}

function playlistItem(){
 
  $(".musPlaylist").click(function(){
    var id = $(this).parent().get(0).id;  
    //navega até a música  
    goMusic(id);
  });


  $(".delMus").click(function(){      
    var id = $(this).parent().get(0).id;
    var ordem = $(this).attr('ordem');    
    delMus(id);
     var el = Object.keys(getJsonById('minhaLista')).length;     
     var list_isEmpty = el == 0 ? true:false;      
      if(list_isEmpty){        
        $("#nomeMusica").text("Música");
        $("#nomeBanda").text("BANDA");
        $("#letra").text("");
      } 
      else{
         el > ordem ? navigateSet(1) : navigateSet(-1);
       }
    });

 }


function navigateSet(sentido){

  var dir = {"1":"right","-1":"left"};
  var sent = dir[sentido];
  var ordem = parseInt(localStorage.getItem('ordem'));
  
  var lista = getJsonById('minhaLista');

  if(lista){
    var tam = Object.keys(lista).length;      
    $("#letra").text()=="" ? sentido=0:false;        
      var obj = Object.values(lista);  
      var next = ordem + sentido;  
      if( 0 <= next && next < tam){    
        var obj = Object.values(lista)[next];    
        localStorage.setItem('ordem',next);
        localStorage.setItem('chaveTemp',chaveBuilder(obj.artista,obj.musica));
        plota(obj,sent);          
      }
  }

}

//carrossel nativo
function plota(favorita,sentido) {    
var s = "right";

if(sentido=="right"){
  s = "left";
}
  $("#letra").toggle("slide",{direction:s},200, function() {
      $("#letra").text(favorita.letra);

      $("#nomeMusica").text(semtraco(favorita.musica));
      $("#musica").val(semtraco(favorita.musica));

      $("#nomeBanda").text(semtraco(favorita.artista));
      $("#artista").val(semtraco(favorita.artista));

      $("#letraDim").val(favorita.fonte);
    $("#letra").css("font-size",favorita.fonte);

 });

  $("#letra").show("slide",{direction:sentido},100);

  plotInfoNotes(favorita);
}


function goMusic(chave){
  var l = getJsonById('minhaLista');  
  localStorage.setItem('ordem',l[chave].id - 1);  
  plota(l[chave],0);    
}

function plotInfoNotes(favorita){
   $("#artistaInfo").text(favorita.artista);
    $("#musicaInfo").text(favorita.musica);
     $("#anotacoes").val(favorita.info);  
}