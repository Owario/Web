$(document).ready(
    function()
    {
    $("#butt1").click(function(){
      $("ol.dropbox").append("<li>Appended item</li>");
    });
});


window.onload = function(){
    var txt = window.location;
    alert(document.documentURI);
    if (txt===)
    {
        if (localStorage.getItem('token')===null)
        {
            alert("Войдите в аккаунт!");
        }
    }
}
