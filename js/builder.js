 function headerBuild(){  
    $.ajax({
      url: "models/header.html",
      async:false,
      context: document.body
    }).success(function(data) {
      $('body').prepend(data);
    });
      
      //listenters
      const $div = $('#letraDim');
        //
      $('#playlistView').click( () => {
        lista();
      });

      //toggleView
      $("#controlToggle").click( function()  {  
        $("#controles").toggle();
      });
      
      //acao de zoom (header -> principal)
      $div.on('input change', function() {    
        zoom($div.val());
      });
      
      //controle de colunas
      $(".columnControl").click( function() {  
        var x = $(this).attr('id');
        $("#letra").css({'column-count':x});      
      });

       //alinhamento
       $(".letraAlign").click( function() {  
        var x = $(this).attr('id');
        console.log(x);
        $("#letra").css({'text-align':""+x});      
      });
}
function footerBuild(){  
    $.ajax({
      url: "models/footer.html",      
      context: document.body
    }).success(function(data) {
      $('body').append(data);
      document.querySelector('#getNotes').addEventListener('click',function(){
       
        $("#principal").carousel('next'); 
        $(this).toggleClass("filter-green");
      });
    });
    
    //acoes    

    
    $(".navega").click(function() {
      navigateSet(parseInt($(this).attr("sentido")));
    });
}
function bodyBuild(){
  playlistBuild(); 
  notasBuild();
}

function notasBuild(){  
    $.ajax({
      url: "models/notas.html",
      async:false,
      context: document.body
    }).success(function(data) {
      $('#notas').html(data);
    });
    //acoes        
}
function playlistBuild(){  
    $.ajax({
      url: "models/playlist.html",
      async:false,
      context: document.body
    }).success(function(data) {
      $('#playlist').html(data);
    });

    $.ajax({
      url: "models/listStorage.html",
      async:false,
      context: document.body
    }).success(function(data) {
      sessionStorage.setItem('listModel',data);
    });
  //acoes      
}

