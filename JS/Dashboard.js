function SignOut(){
    localStorage.removeItem("Data");
    window.location.href = "../HTML/LoginPage.html";
}