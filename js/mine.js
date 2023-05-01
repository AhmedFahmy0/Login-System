var signupName = document.getElementById("signupN");
var signupEmail = document.getElementById("signupE");
var signupPassword = document.getElementById("signupP");

var signinEmail = document.querySelector("#signinEmail");
var signinPassword = document.querySelector("#signinPassword");

var accountLogIn = [];

var accounts = [];

var username;



if (localStorage.getItem('accountLogIn') == null) {
    location.replace="signin.html";
} else {
    location.href= "control.html";    
}


if (localStorage.getItem('users') == null) {
    accounts = []
} else {
    accounts = JSON.parse(localStorage.getItem('users'))
}

if (localStorage.getItem("UsernameOn") == null) {
    username = 0
} else {
    username = localStorage.getItem("UsernameOn")
    document.getElementById("username").innerHTML = "Welcome " + username;
};


/* function  of signUp */
function signUp() {

    if (validateEmail(signupEmail.value) == true && validateName(signupName.value) == true) {

        if (isEmpty() == false) {
            document.getElementById("exist").innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
            return false
        }

        var admin = {
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value,
        }

        if (accounts.length == 0) {
            accounts.push(admin)
            localStorage.setItem('users', JSON.stringify(accounts))
            document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
            return true
        }
        if (isEmailExist() == false) {
            document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'

        } else {
            accounts.push(admin)
            localStorage.setItem('users', JSON.stringify(accounts))
            document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        }

        clearInput()
    } else {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Not Validate</span>'
    }
}

function isEmailExist() {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].email.toLowerCase() == signupEmail.value.toLowerCase()) {
            return false
        }
    }
}

function isEmpty() {

    if (signupName.value == "" || signupEmail.value == "" || signupPassword.value == "") {
        return false
    } else {
        return true
    }
}

function clearInput() {
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
}

/* function  of validate Email */
function validateEmail(userEmailInp) {
    let userEMailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (userEMailRegex.test(userEmailInp) == true) {
        return true;
    } else {
        return false;
    }
}
/* function  of validate Name */
function validateName(userNameInp) {
    let userNameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    if (userNameRegex.test(userNameInp) == true) {
        return true;
    } else {
        return false;
    }
}

function isLoginEmpty() {

    if (signinPassword.value == "" || signinEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {

    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }

    var signInPassword = signinPassword.value
    var signInEmail = signinEmail.value


    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].email.toLowerCase() == signInEmail.toLowerCase() && accounts[i].password.toLowerCase() == signInPassword.toLowerCase()) {
            localStorage.setItem("UsernameOn", accounts[i].name)
            var onlineUser = {
                signInPassword,
                signInEmail
            }
            accountLogIn.push(onlineUser)
            localStorage.setItem('carUser', JSON.stringify(accountLogIn))
            window.location.href = "control.html"
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }

}

function logout() {
    localStorage.removeItem('UsernameOn')
    localStorage.removeItem('carUser')
}