

async function CheckLogin(){
    user_data={
        'mail': document.getElementById("InputEmail1").value,
        'password': document.getElementById("InputPassword1").value
    }
    await axios.post(
        'https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/login',
        user_data).then((response) => {
            data2=JSON.stringify(response);
            type=0;
            var name = new String(data2);
            if (name.indexOf("No such user exists")!==-1) alert("No such user exists");
            if (name.indexOf("Incorrect password")!==-1) alert("Incorrect password");
            data2=JSON.parse(data2,function(k, v) {
                if (k==='statusCode' && v===201){type=1;}
                if (k==='body'){
                    if (type===1){
                    }else{
                        localStorage.setItem('user_token',v);
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
    if (name.indexOf('body')==-1) return;
    name=name.substring(name.indexOf('body'), name.length); 
    name=name.substring(name.indexOf('{'), name.indexOf(']')); 
    work=true;
    while(work){
        if (name.indexOf('}')+2>=name.length) work=false;
        nametofunc=name.substring(name.indexOf('{'),name.indexOf('}')+1);
        $("#mainbox").append(CreateObjectCard(nametofunc));
        name=name.substring(name.indexOf('}')+2,name.length);
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

            LikeUpdate(0,id,likes-1)

        }else{
            like_count.text(likes+1);
            $(this).addClass('btn-success').removeClass('btn-default');
            id=$(this).attr("id")
            id=id.substring(1,id.length);

            LikeUpdate(1,id,likes+1)
        }
        $(this).toggleClass('liked');
        event.preventDefault();
        }
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
                if (name.indexOf('}')+2>=name.length) 
                    {work=false;}
                nametofunc=name.substring(name.indexOf('{'),name.indexOf('}')+1);
                $("#mymainbox").append(CreateObjectCard(nametofunc));
                name=name.substring(name.indexOf('}')+2,name.length);
            } 

            $(".card-footer").remove();
            $(".like-button").addClass("isDisabled");
        }
    }
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


async function LikeUpdate(type,id,likes){
    if (localStorage.getItem('likestring')===null) {CheckLike();}
    if (type==1){
        newlikestring = localStorage.getItem('likestring');
        newlikestring = newlikestring+id.toString()+'/';
        localStorage.removeItem('likestring');
        localStorage.setItem('likestring',newlikestring);
    }
    else
    {
        newlikestring= parseNewLikeString(id.toString());
    }
    data={
        'id': id.toString(),
        'likes': likes.toString(),
        'user_token': localStorage.getItem('user_token'),
        'type': type.toString(),
        'newlikes': newlikestring
    }

    somestring = localStorage.getItem('likestring');
    alert(somestring);
    response = await axios.post('https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/like',data);
}


function parseNewLikeString(id_string){
    somestring = localStorage.getItem('likestring');
    work=1;
    somestring = somestring.substring(somestring.indexOf('/')+1,somestring.length);
    somenewstring='/';
    do{
        like=somestring.substring(0,somestring.indexOf('/'));
        if (like!==id_string){

            somenewstring=somenewstring+like+'/';
        }
        somestring=somestring.substring(somestring.indexOf('/')+1,somestring.length)
        if (somestring.length==0) work=0 
    }while(work===1)
    
    localStorage.removeItem('likestring');
    localStorage.setItem('likestring',somenewstring);
    return somenewstring;
}


async function CheckLike(){
    if (localStorage.getItem('user_token')==null) return;
    data={'user_token': localStorage.getItem('user_token')}
    response = await axios.post('https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/like/likecheck',data);
    data = await JSON.stringify(response);
    var name = new String(data);
    name=name.substring(name.indexOf('body'), name.length); 
    name=name.substring(name.indexOf(':')+2, name.indexOf('}')-1);

    localStorage.setItem('likestring',name);
    work=1
    if (name=='/')
    { 
        return;
    }

    name=name.substring(name.indexOf('/')+1,name.length);
    do{
        like=name.substring(0,name.indexOf('/'));
        ToggleLikeFunc(like);
        name=name.substring(name.indexOf('/')+1,name.length)
        if (name.length==0) work=0
    }while(work===1)
}

function ToggleLikeFunc(name){
    id = name;
    $(".inserthere").text("Полный рецепт:  "+$("#"+id).text());
    $("#0"+id).addClass('btn-success').removeClass('btn-default');
    $("#0"+id).toggleClass('liked');
}


async function UpdateDataProfile(){
    if (localStorage.getItem('user_token')==null) return;
    data={'user_token': localStorage.getItem('user_token')}
    response = await axios.post('https://wm9vou161l.execute-api.us-east-1.amazonaws.com/test0/profile',data);
    data = await JSON.stringify(response);
    var name = new String(data);
    name=name.substring(name.indexOf('body'), name.length); 
    name=name.substring(name.indexOf(':')+2, name.indexOf('}'));
    name=name.substring(name.indexOf("user_nickname"),name.length);
    name=name.substring(name.indexOf(":")+2,name.length);
    nickname=name.substring(0,name.indexOf('"'));
    name=name.substring(name.indexOf("user_likes"),name.length);
    likes=name.substring(name.indexOf(":")+1,name.length);

    $("#sidestat label").remove();
    $("#sidestat br").remove();
    $("#sidestat").append("<p>Псевдоним: <br>"+nickname+"</p>")
    $("#sidestat").append("<p>Лайки: <br>"+likes+"</p>")
}