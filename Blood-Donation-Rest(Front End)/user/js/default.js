var navBar = '<div class="collapse navbar-collapse" id="navbarNav">'
    + '<ul class="navbar-nav">'
    + '<li class="nav-item active"><a class="nav-link" href="donarslist.html">Donars <span class="sr-only">(current)</span></a></li>'
    + '<li class="nav-item active"><a class="nav-link" href="dashboard.html">Dashboard <span class="sr-only">(current)</span></a></li>'
    + '<li class="nav-item active"><a class="nav-link" href="blood_request.html">Blood Request <span class="sr-only">(current)</span></a></li>'
    + '<li class="nav-item"><a class="nav-link" href="Post.html">Post</a></li>'
    + '<li class="nav-item" > <a class="nav-link" href="my-profile.html">My Profile</a></li>'
    + '<li class="nav-item"><a class="nav-link" href="report2.html">Information</a></li>'
    + '<li class="nav-item"><a class="nav-link" href="blood_book.html">Blood Book</a></li>'
    + '<li class="nav-item"><a class="nav-link" onclick="Logout(this)" href="#">Logout</a></li>'
    + '<li class="nav-item"><a class="nav-link" href="funding.html">Funding</a></li>'
    + '</ul></div > ';

var navBarWithOutLogin = '<a class="navbar-brand" href="index.html">Home</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button><div class="collapse navbar-collapse" id="navbarNav">'
    + '<ul class="navbar-nav">'
    + '<li class="nav-item active"><a class="nav-link" href="donarslist.html">Donars <span class="sr-only">(current)</span></a></li>'
    + '<li class="nav-item active"><a class="nav-link" href="post.html">Posts <span class="sr-only">(current)</span></a></li>'
    + '<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>'
    + '<li class="nav-item"><a class="nav-link" href="funding.html">Funding</a></li>'
    + '</ul></div > ';

if (localStorage.getItem("userId") == null) {
    $("nav").html(navBarWithOutLogin);
} else {
    $("nav").html(navBar);
}

function outIfNotLogIn() {
    if (localStorage.getItem("userId") == null) {
        location.replace("login.html");
    }
    return;
}

//localStorage.setItem("userId", "1");
//localStorage.setItem("type", "user");

var userIdInSession = "";

// localStorage.removeItem("userId")


function Logout(element) {
    localStorage.removeItem("userId");
    localStorage.clear();
    location.replace("index.html");
}

function ReturnToDashboardIfLogin() {
    if (localStorage.getItem("userId") != null) {
        location.replace("dashboard.html");
    }
}
