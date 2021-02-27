function buscaMusicaArtista(chave,div) {
   // buscaArtistaImagem(artista());
    let url = "https://api.vagalume.com.br/search.php"
      + "?art=" + encodeURIComponent(artista())
      + "&mus=" + encodeURIComponent(musica());

   $.getJSON(url, function (data) {     
     let str = data['type']=="exact" ? data.mus[0].text : "nao encontrado";
     data['type']=="exact" ? sessionStorage.setItem('tempLyric'+ chave,str):"";          
     setTimeout(()=>{$("#letra").text(str)},100)
   });

   return sessionStorage.getItem('tempLyric' + chave);
}

function buscaArtistaDados(_art){

  let art = comTraco(_art);
  let path = 'https://www.vagalume.com.br';
  let url = `${path}/${art.toLowerCase()}/index.js`;

  loadUrl(url,false,handler);

  function handler(data) { 
    data = JSON.parse(data);
   console.log(data.artist.pic_medium)
    //service     
    saveLyrics(data.artist.lyrics.item);
    //$("#imgBanda").css("background-image", "url(" + imagem(path +  data.artist.pic_medium)  + ")");
    $('#imgBanda').html(imagem(path +  data.artist.pic_medium));
  }

}

function imagem(url){
  let foto = document.createElement("img");
     foto.setAttribute("src",url);
    foto.setAttribute("width","3em");   
    
  return foto;
}

function autoCompleteArtista(art) {
 
  art = comTraco(art);   
  let url = `https://api.vagalume.com.br/search.art?apikey=660a4395f992ff67786584e238f501aa&q=${art}&limit=10`;
  
  loadUrl(url,false,handler);

  function handler(data) { 
    //service     
    console.clear()
    data = JSON.parse(data).response.docs;
    let bandas = [];    
    //console.log(data)
    data.forEach(element => {
      bandas.push(element.band);    
    });    
    //view
    autoComplete("#artista",bandas);
  }
}

function autoCompleteMusicLocal(){
  autoComplete("#musica",JSON.parse(localStorage.getItem('currentArtLyrics'))); 
}

function autoCompleteMusica(mus,art) {

  let url = "https://api.vagalume.com.br/search.artmus?apikey=660a4395f992ff67786584e238f501aa&q=" + comTraco(art) +"%20"+ mus + "&limit=5";
  
  loadUrl(url,false,handler); 
  
  function handler(data) { 
    
    data = JSON.parse(data).response.docs;
    let titulo = [];    
   
    data.forEach(element => {
      bandas.push(element.band);    
      titulo = data.title;
      banda = data.band;
      
      if(comTraco(banda) == comTraco(art) && titulo != undefined)
      {
       musicas.push(titulo);              
      }
    });    
    
    autoComplete("#artista",bandas);
  }
   
  
}

