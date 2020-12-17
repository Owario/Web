
window.onload = function(){
    var href = window.location.href.split('/');    
    var txt = href[href.length-1];

    if (localStorage.getItem('token')===null){
        if (txt==="addrecipe.html" || txt==="myrecipes.html")
        {
            alert("Войдите в аккаунт!");
            //document.location='login.html'
        }
        else{
            $("#torecipe").addClass("isDisabled");
            $("#tomyrecipes").addClass("isDisabled");
        }
    }

    //Изменять авторизоваться на выйти из учетной записи
    //добавлять статистику на главную страницу
    //подгружать 
};

$(document).ready(function()
{
    var href = window.location.href.split('/');    
    var txt = href[href.length-1];
    if (txt==="myrecipes.html"){

        for(i=0;i<10;++i){
            $("#mymainbox").append(CreateObjectCard());
        }

        $("#mymainbox").append(CreateObjectCard());

        $(".mybutton").click(function(event){
            $(".recipemore").modal("show");
            //добавить модельное окно
            alert("a");

            event.preventDefault()
        });

        $(".like-button").remove();
        $(".card-footer").remove();
        
    }
    else{

        for(i=0;i<10;++i){
            $("#mainbox").append(CreateObjectCard());
        }

        $(".like-button").click(function(event){
            var like_count =$(this).find(".like-count");
            var likes = parseInt(like_count.text());
        
            if ($(this).hasClass('liked')){
                like_count.text(likes-1);
                $(this).addClass('btn-default').removeClass('btn-success');
            }else{
                like_count.text(likes+1);
                $(this).addClass('btn-success').removeClass('btn-default');
            }
            $(this).toggleClass('liked');
            event.preventDefault();
            //Отправлять на сервер
        });

        $(".mybutton").click(function(event){
            var recipe_id = $(this).closest('.col-mb-4').attr('id');
            alert(recipe_id);
            //получить подробные данные по айди
            $(".recipemore").modal("show");
            event.preventDefault();
        });

    }
}
)


$("#Пук").click(function(){
    $("#sidestat label").remove();
    $("#sidestat br").remove();
    $("#sidestat").append("<p>Some text.</p>")
});


function CreateObjectCard(){
    return $(                
        '<div class="col-mb-4" id="1">'+
            '<div class="card">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">Болгарские пельмени с поджаркой</h5>'+
                    '<h6 class="card-subtitle mb-2 text-muted">Болгарская кухня</h6>'+
                    '<p class="card-text sized">Some quick example tbhgfhgfhgfhgfhgfhgfhgfhgf.</p>'+
                    '<p>'+
                        '<a href="" class="btn btn-primary mybutton" role="button">Подробнее</a>'+
                        '<a href="" class="btn btn-default like-button" role="button">'+
                        '(<span class="like-count">6</span>)Нравится'+
                        '</a>'+
                    '</p>'+
                    '<div class="card-footer">'+
                        '<small class="text-muted">Рецепт написан: coookiezy</small>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    );
};

