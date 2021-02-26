 function headerBuild(){  

    //console.log($('body').html());  

      loadLocal('models/header.html','header',listeners);
    
      function listeners(){
      //listenters do header
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
          let x = $(this).attr('id');
          console.log(x);
          $("#letra").css({'text-align':""+x});      
        });

    }
}
function footerBuild(){  
    loadLocal('models/footer.html','footer',listeners);

    function listeners(){
       $('#getNotes').click(()=>
        {
          $("#principal").carousel('next'); 
          $(this).toggleClass("filter-green");
        }
      )
      $(".navega").click(function() {
        navigateSet(parseInt($(this).attr("sentido")));
      }); 
    }
}
function bodyBuild(){
  playlistBuild(); 
  notasBuild();
}

function notasBuild(){  
  loadLocal('models/notas.html','#notas','')        
}
function playlistBuild(){  
  
    loadLocal('models/playlist.html','#playlist','')
    loadLocal('models/listStorage.html',false,saveList)

    function saveList(){
      sessionStorage.setItem('listModel',data);
    }
    
}

function loadLocal(url,target,handler){
    fetch(url)
        .then( response =>   {        
            return response.ok ? response.text() : false; 
         })
        .then( function response(responseHtml)
            { 
              //console.log(responseHtml)
              if(target){
                document.querySelector(target).innerHTML = (responseHtml);  
              }
              handler();
            } )
        .catch(function (e) {       
            return 'erro' ;
            console.log(e);                
        }); 
}