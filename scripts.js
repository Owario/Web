
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
}

$("#Пук").click(function(){
    $("#sidestat label").remove();
    $("#sidestat br").remove();
    $("#sidestat").append("<p>Some text.</p>")
});

function CheckLogin(){
    alert("checked");
}

function ShowRegMenu(){
    $(".loginmenu").css({"display": "none"});
    $(".regmenu").css({"display": "block"});
}

function ShowLogMenu(){
    $(".regmenu").css({"display": "none"});
    $(".loginmenu").css({"display": "block"});
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
    event.preventDefault()
    //Отправлять на сервер
});


$(".mybutton").click(function(event){

    //добавить модельное окно
    $("#1").remove();
    event.preventDefault()
});

$(".mybutton2").click(function(event){
    $("#mainbox").append($(                
        '<div class="col-mb-4" id="1">'+
            '<div class="card">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">Болгарские пельмени с поджаркой</h5>'+
                    '<h6 class="card-subtitle mb-2 text-muted">Болгарская кухня</h6>'+
                    '<p class="card-text sized">Some quick example tbhgfhgfhgfhgfhgfhgfhgfhgf.</p>'+
                    '<p>'+
                        '<a href="#" class="btn btn-primary" role="button">Подробнее</a>'+
                        '<a href="#" class="btn btn-default like-button" role="button">'+
                        '(<span class="like-count">6</span>)Нравится'+
                        '</a>'+
                    '</p>'+
                    '<div class="card-footer">'+
                        '<small class="text-muted">Рецепт написан: coookiezy</small>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    ));
    event.preventDefault()
});
