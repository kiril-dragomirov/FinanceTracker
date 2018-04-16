getUserEditInfo();

function getUserEditInfo(){
    var request=new XMLHttpRequest();
    request.open("get","../controller/editController.php?get=UserInfo");
    request.onreadystatechange=function(){
        if(request.readyState===4 && request.status===200){
            var response=JSON.parse(this.responseText);
            console.log(response)
            document.getElementById("name").value=response["name"];
            document.getElementById("family").value=response["family_name"];
            document.getElementById("age").value=response["age"];
            document.getElementById("email").value=response["email"];
            var img=document.createElement("IMG");
            img.setAttribute("src", response["image_url"]);
            document.getElementById("curAvatar").appendChild(img);
        }
    }
    request.send();
}

function Validation(form){
    var errors=true;
    var nameErr=document.getElementById("usernameErr");
    var familyErr=document.getElementById("familynameErr");
    var passwordErr=document.getElementById("passwordErr");
    var emailErr=document.getElementById("emailErr");
    var ageErr=document.getElementById("ageErr");
    var avatarErr=document.getElementById("avatarErr");
    var rePasswordErr=document.getElementById("rePasswordErr");
    var currentPasswordErr=document.getElementById("currentPasswordErr");


    //regex for name;
    var nameRegex = /^[a-zA-Z ]+$/;

    //regex for email;
    var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


    //regex for password;
    var reMedium = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    //regex for Age;
    var reAge=/\s[0-1]{1}[0-9]{0,3}/;

    if(form.name.value.trim()===""){
        nameErr.style.visibility="visible";
        nameErr.style.color="red";
        nameErr.innerHTML="There is no first name entered";
        errors=false;
    }else if(!nameRegex.test(form.name.value.trim())){
        nameErr.style.visibility="visible";
        nameErr.style.color="red";
        nameErr.innerHTML="The username is not valid!";
        errors=false;
    }else{
        nameErr.style.visibility="hidden";
    }

    if(form.email.value.trim()===""){
        emailErr.style.visibility="visible";
        emailErr.style.color="red";
        emailErr.innerHTML="Please insert email";
        errors=false;
    }else if(!emailRegex.test(form.email.value.trim())){
        emailErr.style.visibility="visible";
        emailErr.style.color="red";
        emailErr.innerHTML="Incorect email";
        errors=false;
    }else{
        emailErr.style.visibility="hidden";
    }

    // if(form.password.value.trim()===""){
    //     passwordErr.style.visibility="visible";
    //     passwordErr.style.color="red";
    //     passwordErr.innerHTML="Please insert password!";
    //     errors=false;
    // }else

        if (!reMedium.test(form.password.value.trim())) {
            passwordErr.style.visibility = "visible";
            passwordErr.style.color = "red";
            passwordErr.innerHTML = "password must contain one Big Letter and One small letter,except number AND BE LONGER THAN 8 CHARS!";
            errors = false;
        } else {
            passwordErr.style.visibility = "hidden";
        }

    if (form.password.value.trim()!==form.repeatPassword.value.trim()){
        rePasswordErr.style.visibility="visible";
        rePasswordErr.style.color="red";
        rePasswordErr.innerHTML="Passwords mismatch!";
        errors=false;

    }else{
        rePasswordErr.style.visibility="hidden";
    }

    if(form.family.value.trim()===""){
        familyErr.style.visibility="visible";
        familyErr.style.color="red";
        familyErr.innerHTML="Please insert family name!";
        errors=false;
    }else if(!nameRegex.test(form.family.value.trim())){
        familyErr.style.visibility="visible";
        familyErr.style.color="red";
        familyErr.innerHTML="Please insert correct family name!";
        errors=false;
    }else{
        familyErr.style.visibility="hidden";
    }

    if(form.age.value.trim()===""){
        ageErr.style.visibility="visible";
        ageErr.style.color="red";
        ageErr.innerHTML="Please Insert age!";
        errors=false;
    }else if(reAge.test(form.age.value.trim())){
        ageErr.style.visibility="visible";
        ageErr.style.color="red";
        ageErr.innerHTML="Please insert correct age!";
        errors=false;
    }else if(form.age.value.trim()<0 && form.age.value.trim()>120){
        ageErr.style.visibility="visible";
        ageErr.style.color="red";
        ageErr.innerHTML="Please insert correct age. Because probably you are not still born or u are not human!";
        errors=false;
    }else{
        ageErr.style.visibility="hidden";
    }
    if(document.getElementById("avatar").value!="") {
        if (document.getElementById("avatar").files[0].size > 2097152) {
            avatarErr.style.visibility = "visible";
            avatarErr.style.color = "red";
            avatarErr.innerHTML = "file must be under 2MB";
            errors = false;
        } else {
            avatarErr.style.visibility = "hidden";
        }
    }
    //PROBLEM NOT SHA1 in JS
    if(form.currentPassword.value.trim()===""){
        currentPasswordErr.style.visibility="visible";
        currentPasswordErr.style.visibility="red";
        currentPasswordErr.innerHTML="Please insert your current password";
        errors=false;
    }
    // else if(document.getElementById("currentPassword")!=="") {
    //     var password=getPass();
    //     if(password!==document.getElementById("currentPassword").value.trim()){
    //         currentPasswordErr.style.visibility="visible";
    //         currentPasswordErr.style.visibility="red";
    //         currentPasswordErr.innerHTML="Please insert your current password";
    //         errors=false;
    //     }
    // }
    function getPass() {
        var request = new XMLHttpRequest();
        request.open("get", "../controller/editController.php?get=UserInfo");
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                var response = JSON.parse(this.responseText);
                var pass = response["password"];
                return pass;
                    console.log(pass);
            }
        };
        request.send();
    }


    return errors;


}