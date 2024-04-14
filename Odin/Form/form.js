document.getElementById("button-account").addEventListener("click", function() {
  let passwordInput = document.getElementById("password");
  let confirm = document.getElementById("confirm-password");
  if (passwordInput.value != confirm.value) {
    passwordInput.classList.add("invalid");
    confirm.classList.add("invalid");
  } else {
    passwordInput.classList.remove("invalid");
    confirm.classList.remove("invalid");
    document.getElementById("myForm").submit();  
  }
});