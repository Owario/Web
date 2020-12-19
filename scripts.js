
window.onload = function(){
    var href = window.location.href.split('/');    
    var txt = href[href.length-1];

    if (localStorage.getItem('user_token')===null){
        if (txt==="addrecipe.html" || txt==="myrecipes.html")
        {
            alert("Войдите в аккаунт!");
            document.location='login.html'
        }
        else{
            $("#torecipe").addClass("isDisabled");
            $("#tomyrecipes").addClass("isDisabled");
        }
    }else{
        if (txt==="login.html"||txt==="registration.html"){
            localStorage.clear();
            $("#torecipe").addClass("isDisabled");
            $("#tomyrecipes").addClass("isDisabled");
        }
        else{
            $("#log-in").text('Выйти из аккаунта');
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
        GetMyRecipes();
    }
    else{
        if (txt==="login.html"||txt==="registration.html"){
            localStorage.clear();
        }
        else
        {
            if (txt==="home.html")
            {
                GetAllRecipes();

            }
        }

    }
}
)






