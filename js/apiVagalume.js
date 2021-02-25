function buscaMusicaArtista(chave,div) {
   // buscaArtistaImagem(artista());

    let url = "https://api.vagalume.com.br/search.php"
      + "?art=" + encodeURIComponent(artista())
      + "&mus=" + encodeURIComponent(musica());

      console.log(url);

   $.getJSON(url, function (data) {     
     let str = data['type']=="exact" ? data.mus[0].text : "nao encontrado";
     data['type']=="exact" ? sessionStorage.setItem('tempLyric'+ chave,str):"";          
     setTimeout(()=>{$("#letra").text(str)},100)
   });

   

   return sessionStorage.getItem('tempLyric' + chave);
}

function buscaArtistaDados(_art){

  let art = comTraco(_art);
  let url = "https://www.vagalume.com.br/";
  console.log(url);
  jQuery.getJSON(
    "https://www.vagalume.com.br" + "/" + art.toLowerCase() + "/index.js",
    function (data) {      
      console.log(data);
      saveLyrics(data.artist.lyrics.item);
      // Imprime Imagem - Nome do artista
      //view
      $("#fundoBanda").css("background-image", "url(" + imagem(url +  data.artist.pic_medium)  + ")");
    }
  );

}

function imagem(url){
  let foto = document.createElement("img");
  foto.setAttribute("src",url);
  foto.setAttribute("width","250px");
  return foto.src;
}

function autoCompleteArtista(art) {
 
  art = comTraco(art);
   
  let url = `https://api.vagalume.com.br/search.art?apikey=660a4395f992ff67786584e238f501aa&q=${art}&limit=10`;

  
  $.getJSON(
    url,
    function (data) { 
      //service     
      let n = data["response"]["docs"].length;
      let bandas = [];
      for (let i = 0; i < n; i++) {
        bandas.push(data["response"]["docs"][i].band)
      }
      //view
      $("#artista").autocomplete({
        //popula o "source" com o array
        source: bandas
      });
    }
  );
}

function autoCompleteMusicLocal(){
  $("#musica").autocomplete({
    source: JSON.parse(sessionStorage.getItem('currentArtLyrics'))
  });
}

function autoCompleteMusica(mus,art) {

  let url = "https://api.vagalume.com.br/search.artmus?apikey=660a4395f992ff67786584e238f501aa&q=" + comTraco(art) +"%20"+ mus + "&limit=5";
  
  $.getJSON(
    url,
    function (data) {
      
      // Imprime Imagem - Nome do artista
      let n = data["response"]["docs"].length;
      let musicas = [];
      //console.log(data);
      //console.log(url);
      for (let i = 0; i < n; i++) {
        
        titulo = data["response"]["docs"][i].title;
        banda = data["response"]["docs"][i].band;
        //musicas.indexOf(titulo) > -1 ? "" : comTraco(banda) == comTraco(art) ? musicas.push(titulo):"";        
        if(comTraco(banda) == comTraco(art))
        {
          titulo != undefined ? musicas.push(titulo):"";              
        }
      }
      $("#musica").autocomplete({
        source: musicas
      });
    }
  );
}

