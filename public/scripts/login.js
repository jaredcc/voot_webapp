


function login() {

  var email = document.getElementById('email');
  var password = document.getElementById('password');

  // Send Request to Backend to login
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        window.user = xmlHttp.responseText;
        console.log(window);
    }
  }
  xmlHttp.open("POST", 'http://localhost:3000/users/login', true); // true for asynchronous
  xmlHttp.send(null);

}
