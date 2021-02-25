$(document).ready(function() {  
  
  headerBuild();      
  bodyBuild();
  footerBuild();
  
  modalPesquisaInicio();
  inicioSetList();

 


  if(!localStorage.getItem('minhaLista')){
    //introdução
    //roda animação    
    //introduce();    
  }
 });

function introduce(){
    //$('#pesqToggle').toggleClass('btn-dark');
    //$('#pesqToggle').toggleClass('btn-light txt-black');
    $('#pesqToggle').toggleClass('metro44');     
    $('#letra').html("<div class='card'><h3>Para pesquisar Use o Menu Acima</h3></div>");     
    
    let myGreeting = setTimeout(
      function() {
      $('#pesqToggle').removeClass('metro44');                  
      $('#letra').html('');
      //$('#pesqToggle').toggleClass('btn-dark');
      
      //$('#pesqToggle').toggleClass('btn-light txt-black');       
    }, 3000) //3s
  }

 function getMusArt(_chave) {
    //let chave = chaveBuild(artista(),musica());

    let chave = chaveBuild(artista(),comTraco(_chave));
    let _letra = getMusLocal(_chave) ? getMusLocal(chave).letra:buscaMusicaArtista(chave,"#letra");
    
    setTimeout(()=>{$("#letra").text(_letra)},100)
  }

  //dentro modal pesquisa
  function musica(){
    //view + service
    let mus = semtraco($("#musica").val());
    return mus;
  }

  function artista(){
    //view + service
    let art = $("#artista").val();
    return art;
  }

 function chaveBuild(){
    let x = comTraco(artista()) + comTraco(musica());
    return  x.toLowerCase();
 }

 function chaveBuilder(art,mus){
  let x = comTraco(art) + comTraco(mus);
  return  x.toLowerCase();
}

 function semtraco(el){
    //return el.replaceAll("-"," ");
    return el.replace(/-/g, ' ');
 }

 //service
 function comTraco(el){   
  //console.log(el);
   let bar = "/";
    el = el.replace(/'/g, '');    
    el = el.replace('/',"-");
    return el.replace(/ /g, '-');
 }

 