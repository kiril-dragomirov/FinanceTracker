checkIfUserIsLogged();

function checkIfUserIsLogged() {
    var request = new XMLHttpRequest();
    request.open("get", "../index.php?target=user&action=check");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            var loc = window.location.href;
        if (this.responseText === "true") {

            if (loc == "http://localhost/FinanceTracker/view/login.html" || loc == "http://localhost/FinanceTracker/view/register.html") {
                window.location.href = "index.html";
            }

            console.log(window.location.href);
        } else {
            console.log(window.location.href);

            if (loc == "http://localhost/FinanceTracker/View/register.html" || loc == "http://localhost/FinanceTracker/view/register.html") {
                // window.location.href = "register.html";
            } else if (loc == "http://localhost/FinanceTracker/View/login.html" || loc == "http://localhost/FinanceTracker/view/login.html") {
                // window.location.href = "login.html";
            } else if (loc != "http://localhost/FinanceTracker/View/login.html" || loc != "http://localhost/FinanceTracker/view/login.html") {
                window.location.href = "login.html";

            }
        }

    }
    }

    request.send();
}