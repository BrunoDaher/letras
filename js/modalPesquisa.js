function modalPesquisaInicio(){
  acoesInputPesquisa();
}

function acoesInputPesquisa(){
//id-pesquisa//modal//
  $('#anotacoes').on('input', function(e){
    //buscaArtistaImagem(artista());
    saveNotes();
  });
 
  //btnPesq
  $('#btnPesq').on('click', function(e){        
    getMusArt($("#musica").val());
  });

  ///artista
  $('#artista').on('input', function(e){    
    autoCompleteArtista(artista());
  });  

  $('#artista').on('click', function(e){    
    this.value=''
  });  


  $('#artista').on('change', function(e,ui){                
    //$(this).attr('value',e.currentTarget.value);      
    buscaArtistaDados(comTraco(e.currentTarget.value));
  });

  $('#artista').on('autocompleteselect', function(e,ui){   
    
    let _ui = ui.item.value;    
    $(this).attr('value',_ui);  
    
    //$(this).attr('value',ui.item.label);    
    //buscaArtistaDados(comTraco(e.currentTarget.value));  
  });

  $('#musica').on('click', function(e){    
    this.value=''
  });  

  //musica
  $('#musica').on('input', function(e){        
    //console.log(e.currentTarget.value + " vs " + $("#musica").val());
    autoCompleteMusicLocal();
  });
 
  $('#musica').on('autocompleteselect', function(e,ui){                
    let _ui = ui.item.value;    
    $(this).attr('value',_ui);    
    setTimeout(()=>{getMusArt(_ui)},100)
  });

  $('#musica').on('change', function(e,ui){   
    
    //$(this).attr('value',e.currentTarget.value);    
    //console.log("e.currentTarget :" + e.currentTarget.value + "| val(): " + $("#musica").val() + "| ui-> " + ui);
    getMusArt($("#musica").val());
  });

}



