

async function CheckLogin(){
    user_data={
        mail: document.getElementById("InputEmail1").value,
        password: document.getElementById("InputPassword1").value
    }
    await axios.post(
        'https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/login',
        user_data).then((response) => {
            data2=JSON.stringify(response);
            type=0;
            alert(data2);
            data2=JSON.parse(data2,function(k, v) {
                if (k==='statusCode' && v===201){type=1;}
                if (k==='body'){
                    if (type===1){
                        alert(v);
                    }else{
                        localStorage.setItem('user_token',v);
                        alert(v);
                    }
                }
            });
        })
    IfAuthorized(); 
}

async function RegistrUser(){
    user_data={
        mail: document.getElementById("InputEmail2").value,
        nickname: document.getElementById("Nickname").value,
        password: document.getElementById("InputPassword2").value
    }
    await axios.post(
        'https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/registr',
        user_data).then((response) => {
            data2=JSON.stringify(response);
            type=0;
            data2=JSON.parse(data2,function(k, v) {
                if (k==='statusCode' && v===201){type=1;}
                if (k==='body'){
                    if (type===1){
                        alert(v);
                    }else{
                        localStorage.setItem('user_token',v);
                    }
                }
            });
        })
    IfAuthorized(); 
}

function IfAuthorized(){
    if (localStorage.getItem('user_token')!==null){
        document.location='home.html';
    }
}


async function CreateRecipe(){
    if (document.getElementById("name1").value!==''&&document.getElementById("exampleFormControlSelect1").value!==''&&document.getElementById("recipe1").value!==''&&document.getElementById("recipe2").value!==''){

   recipe_data={
       user_token: localStorage.getItem('user_token'),
       recipe_name: document.getElementById("name1").value,
       recipe_type: document.getElementById("exampleFormControlSelect1").value,
       description: document.getElementById("recipe1").value,
       full_description: document.getElementById("recipe2").value
   }

   await axios.post(
    'https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/recipes',
    recipe_data).then((response) => {
        data2=JSON.stringify(response);
        type=0;
        data2=JSON.parse(data2,function(k, v) {
            if (k==='statusCode' && v===201){type=1;}
            if (k==='body'){
                if (type===1){
                    alert(v);
                }else{
                    alert(v);
                    document.location='myrecipes.html';
                }
            }
        });
    })

   }
   else{
       alert("Заполните все поля!")
   }
}




async function GetAllRecipes(){
    response = await axios.get('https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/recipes');
    data = await JSON.stringify(response);
    var name = new String(data);
    name=name.substring(name.indexOf('body'), name.length); 
    name=name.substring(name.indexOf('{'), name.indexOf(']')); 
    work=true;
    while(work){
        nametofunc=name.substring(name.indexOf('{'),name.indexOf('}')+1);
        $("#mainbox").append(CreateObjectCard(nametofunc));
        name=name.substring(name.indexOf('}')+2,name.length);
        if (name.indexOf('}')+2>=name.length) work=false;
    } 

    $(".like-button").click(function(event){
        if (localStorage.getItem('user_token')===null){
            alert("Сначала авторизируйтесь!")
        }
        else{
        var like_count =$(this).find(".like-count");
        var likes = parseInt(like_count.text());
    
        if ($(this).hasClass('liked')){
            like_count.text(likes-1);
            $(this).addClass('btn-default').removeClass('btn-success');
            id=$(this).attr("id")
            id=id.substring(1,id.length);

            alert(id);
            alert(likes-1);
            LikeUpdate(id,likes-1)

        }else{
            like_count.text(likes+1);
            $(this).addClass('btn-success').removeClass('btn-default');
            id=$(this).attr("id")
            id=id.substring(1,id.length);

            alert(id);
            alert(likes+1);
            LikeUpdate(id,likes+1)
        }
        $(this).toggleClass('liked');
        event.preventDefault();
        }
});


    $("#Пук").click(function(){
        $("#sidestat label").remove();
        $("#sidestat br").remove();
        $("#sidestat").append("<p>Some text.</p>")
    });  
}


async function GetMyRecipes(){
    if (localStorage.getItem('user_token')!==null){
        user_data={
            "token": localStorage.getItem('user_token')
        }

        response = await axios.post('https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/myrecipes',user_data);
        data = await JSON.stringify(response);
        var name = new String(data);
        if (name.indexOf('body')!==-1){
            name=name.substring(name.indexOf('body'), name.length); 
            name=name.substring(name.indexOf('{'), name.indexOf(']')); 
            work=true;
            while(work){
                nametofunc=name.substring(name.indexOf('{'),name.indexOf('}')+1);
                $("#mymainbox").append(CreateObjectCard(nametofunc));
                name=name.substring(name.indexOf('}')+2,name.length);
                if (name.indexOf('}')+2>=name.length) work=false;
            } 

            $(".card-footer").remove();
            $(".like-button").remove();
        }
    }
}

async function LikeUpdate(id,likes){
    data={'id': id.toString(),'likes':likes.toString()};
    response = await axios.post('https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/like',data);
}






function showModal(id){
    id2 = id.toString()

    $(".inserthere").text("Полный рецепт:  "+$("#"+id).text());
    $(".recipemore").modal("show");
}


function CreateObjectCard(name){
    creator=name.substring(name.indexOf(':')+2,name.indexOf('recipe_id')-3);
    name=name.substring(name.indexOf('recipe_id'),name.length);

    recipe_id=name.substring(name.indexOf(':')+2,name.indexOf('recipe_type')-3);
    name=name.substring(name.indexOf('recipe_type'),name.length);

    recipe_type=name.substring(name.indexOf(':')+2,name.indexOf('recipe_description')-3);
    name=name.substring(name.indexOf('recipe_description'),name.length);

    recipe_description=name.substring(name.indexOf(':')+2,name.indexOf('recipe_full_description')-3)
    name=name.substring(name.indexOf('recipe_full_description'),name.length);

    recipe_full_description=name.substring(name.indexOf(':')+2,name.indexOf('like_counts')-3)
    name=name.substring(name.indexOf('like_counts'),name.length);

    like_counts12=name.substring(name.indexOf(':')+2,name.indexOf('recipe_name')-3)
    name=name.substring(name.indexOf('recipe_name'),name.length);

    recipe_name12=name.substring(name.indexOf(':')+2,name.indexOf('}')-1);

    return $(                
        '<div class="col-mb-4">'+
            '<div class="card">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">'+recipe_name12+'</h5>'+
                    '<h6 class="card-subtitle mb-2 text-muted">'+recipe_type+'</h6>'+
                    '<p class="card-text sized">'+ recipe_description + '</p>'+
                    '<p>'+
                        '<input type="button" class="mybt" value="Подробнее" onclick="showModal('+recipe_id+')">'+
                        '<a href="" class="btn btn-default like-button" id="0'+recipe_id+'" role="button">'+
                        '(<span class="like-count">'+ like_counts12 +'</span>)Нравится'+
                        '</a>'+
                    '</p>'+
                    '<div class="card-footer">'+
                        '<small class="text-muted">Рецепт написан: '+creator+'</small>'+
                    '</div>'+'<span style="display: none;" id="'+recipe_id+'">'+recipe_full_description+'</span>'+
                '</div>'+
            '</div>'+
        '</div>'
    );
};
