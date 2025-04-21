function showPwd() {
  var input = document.getElementById('pwd');
  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const pathname = window.location.pathname;
  if (pathname.includes("/error=true")) {
    document.getElementById("errorBox").style.display = "block";
  }
});