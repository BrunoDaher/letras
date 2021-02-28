 function headerBuild(){  

    //console.log($('body').html());  

      loadUrl('models/header.html','header',listeners);
    
      function listeners(){
      //listenters do header
        const $div = $('#letraDim');
        
        //lista
        $('#playlistView').on('click', lista);

        //toggleView
        $("#controlToggle").on('click',$("#controles").toggle);
        
        
        //acao de zoom (header -> principal)
        $div.on('input change', () => 
          { 
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
          //console.log(x);
          $("#letra").css({'text-align':""+x});      
        });

    }
}
function footerBuild(){  
    loadUrl('models/footer.html','footer',listeners);

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

      $("#imgBanda").click(function() {
        let c = $(this).attr('name');
        let alb = getJsonById('minhaLista')[c].albums;        
        
        $('#albums').html('')

        alb.forEach(element => {
          let sub = document.createElement('div');        
          sub.innerHTML = element.desc;
          $('#albums').append(sub);
        });

      }); 
    }
}
function bodyBuild(){
  playlistBuild(); 
  notasBuild();
}

function notasBuild(){  
  loadUrl('models/notas.html','#notas','')        
}
function playlistBuild(){  
  
    loadUrl('models/playlist.html','#playlist','')
    loadUrl('models/listStorage.html',false,saveList)

    function saveList(data){
      sessionStorage.setItem('listModel',data);
    }
    
}

//ajax
function loadUrl(url,target,handler){
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
              handler(responseHtml);
            } )
        .catch(function (e) {       
            return 'erro' ;
            console.log(e);                
        }); 
}
