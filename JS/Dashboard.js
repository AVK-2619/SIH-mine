function SignOut(){
    localStorage.removeItem("Data");
    window.location.href = "../HTML/LoginPage.html";
}

function Loadd(){
    const ResponseData = JSON.parse(localStorage.getItem("Data"));
    document.getElementById("Username").textContent += ResponseData[0].Username;
    document.getElementById("CompanyName").textContent += ResponseData[0].CompanyName;
    document.getElementById("Age").textContent += ResponseData[0].Age;
    document.getElementById("Qualification").textContent += ResponseData[0].Qualification;
    document.getElementById("Skills").textContent += ResponseData[0].Skills;
    if((ResponseData[0].UserType == 'S') || (ResponseData[0].UserType == "G")){
        document.getElementById("Age").style.display = "block";
        document.getElementById("Qualification").style.display = "block";
        document.getElementById("Skills").style.display = "block";
    } else if(ResponseData[0].UserType == "C"){
        document.getElementById("CompanyName").style.display = "block";
    }
}

window.addEventListener("DOMContentLoaded", Loadd());