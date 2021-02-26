$(document).ready(function() {  
  
  headerBuild();      
  bodyBuild();
  footerBuild();
  
  modalPesquisaInicio();
  inicioSetList();

 });


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

 