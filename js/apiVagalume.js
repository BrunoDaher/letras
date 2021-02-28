function buscaMusicaArtista(chave,div) {
   // buscaArtistaImagem(artista());
    let url = "https://api.vagalume.com.br/search.php"
      + "?art=" + encodeURIComponent(artista())
      + "&mus=" + encodeURIComponent(musica());

   $.getJSON(url, function (data) {
     let str = data['type']=="exact" ? data.mus[0].text : "nao encontrado";
     data['type']=="exact" ? sessionStorage.setItem('tempLyric'+ chave,str):"";          
     setTimeout(()=>{
       $("#letra").text(str)},100)
   });

   return sessionStorage.getItem('tempLyric' + chave);
}

function buscaArtistaDados(_art){

  let art = comTraco(_art);
  let path = 'https://www.vagalume.com.br';
  let url = `${path}/${art.toLowerCase()}/index.js`;

  //salva dados
  loadUrl(url,false,handler);  
  function handler(data) { 
    data = JSON.parse(data);
     // albuns
     //console.log(data);
     
     let albums = [] 
     data.artist.albums.item.forEach(element => {
      albums.push({desc:element.desc,url:element.url});
     });

     // letras
     let letras = []
     data.artist.lyrics.item.forEach(element => {
      letras.push(element.desc);
     });

    let temp = {
      img:`${path}/${data.artist.pic_small}`,
      letras:letras,
      albums:albums,
      artista:_art
    }
     //guarda informações    
     
    saveTemp(temp);

    $('#imgBanda').html(imagem(temp.img,temp.artista));
    $('#nomeBanda').html(temp.artista);
    $('#nomeMusica').html(''); 
  }

  let discog = `${path}/${art.toLowerCase()}/discografia/`;
  
  loadUrl(discog,false,hand2);
  //discografia
   
   function hand2(data){
      let parser = new DOMParser();
      let htmlDoc = parser.parseFromString(data, 'text/html');
      let bd = htmlDoc.body.querySelector('.topLetrasWrapper');      
      let musicas = []
      bd.querySelectorAll('.nameMusic').forEach(element => {        
        musicas.push(element.innerHTML);
      });          
    }


}



function htmlToArr(data){

}

function imagem(url,id){
  //console.log(url)
  let foto = document.createElement("img");
     foto.setAttribute("src",url);
    foto.setAttribute("width","3em");     
    foto.id = id;      
  return foto;
}

function autoCompleteArtista(art) {
 
  art = comTraco(art);   
  let url = `https://api.vagalume.com.br/search.art?apikey=660a4395f992ff67786584e238f501aa&q=${art}&limit=10`;
  
  loadUrl(url,false,handler);

  function handler(data) {         
    data = JSON.parse(data).response.docs;
    let bandas = [];          
    data.forEach(element => {
      bandas.push(element.band);    
    });    
    //view
    autoComplete("#artista",bandas);
  }
}

function autoCompleteMusicLocal(){
  let letras = JSON.parse(sessionStorage.getItem('temp')).letras;
  autoComplete("#musica",letras); 
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
    
    //autoComplete("#artista",bandas);
  }
   
  
}

